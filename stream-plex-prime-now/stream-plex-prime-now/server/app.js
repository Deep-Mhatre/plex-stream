import "dotenv/config";
import cors from "cors";
import express from "express";
import { clerkMiddleware, clerkClient, getAuth } from "@clerk/express";
import { verifyWebhook } from "@clerk/backend/webhooks";
import { getDb } from "./db.js";

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:8080";

app.use(cors({ origin: CORS_ORIGIN, credentials: true, allowedHeaders: ["Content-Type", "Authorization"] }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    if (!signingSecret) {
      return res.status(500).json({ error: "Missing webhook signing secret" });
    }

    try {
      const payload = req.body.toString("utf8");
      const headers = new Headers();
      const svixHeaders = ["svix-id", "svix-timestamp", "svix-signature"];
      svixHeaders.forEach((name) => {
        const value = req.headers[name];
        if (value) headers.set(name, String(value));
      });

      const request = new Request("http://localhost/api/webhooks/clerk", {
        method: "POST",
        headers,
        body: payload,
      });

      const event = await verifyWebhook(request, {
        signingSecret,
      });

      const db = await getDb();

      if (event.type === "user.created") {
        const user = event.data;
        await db.collection("users").updateOne(
          { clerkId: user.id },
          {
            $set: {
              clerkId: user.id,
              email: user.email_addresses?.[0]?.email_address || null,
              firstName: user.first_name || null,
              lastName: user.last_name || null,
              imageUrl: user.image_url || null,
              createdAt: user.created_at ? new Date(user.created_at) : new Date(),
              updatedAt: user.updated_at ? new Date(user.updated_at) : new Date(),
            },
          },
          { upsert: true }
        );
      }

      if (event.type === "session.created") {
        const session = event.data;
        await db.collection("sessions").updateOne(
          { clerkSessionId: session.id },
          {
            $set: {
              clerkSessionId: session.id,
              clerkUserId: session.user_id,
              status: session.status || null,
              createdAt: session.created_at ? new Date(session.created_at) : new Date(),
              lastActiveAt: session.last_active_at ? new Date(session.last_active_at) : null,
            },
          },
          { upsert: true }
        );
      }

      return res.json({ ok: true });
    } catch (error) {
      console.error("Webhook error:", error);
      return res.status(400).json({ error: "Invalid webhook" });
    }
  }
);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/api/me", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    return res.json({
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress || null,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      imageUrl: user.imageUrl || null,
    });
  } catch (error) {
    console.error("Failed to fetch Clerk user:", error);
    return res.status(500).json({ error: "Failed to load user" });
  }
});

app.post("/api/track-auth", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const db = await getDb();
    await db.collection("auth_events").insertOne({
      clerkUserId: userId,
      action: req.body?.action || null,
      name: req.body?.name || null,
      createdAt: new Date(),
      clientTimestamp: req.body?.timestamp ? new Date(req.body.timestamp) : null,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || null,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Track auth error:", error);
    return res.status(500).json({ error: "Failed to track auth" });
  }
});

app.post("/api/track-view", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const db = await getDb();
    await db.collection("track_views").insertOne({
      clerkUserId: userId,
      contentId: req.body?.contentId || null,
      contentTitle: req.body?.contentTitle || null,
      contentType: req.body?.contentType || null,
      action: req.body?.action || null,
      page: req.body?.page || null,
      episode: req.body?.episode || null,
      createdAt: new Date(),
      clientTimestamp: req.body?.timestamp ? new Date(req.body.timestamp) : null,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || null,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Track view error:", error);
    return res.status(500).json({ error: "Failed to track view" });
  }
});

app.post("/api/user-watchlist", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const db = await getDb();
    const action = req.body?.action;
    const contentId = req.body?.contentId;

    if (!contentId) {
      return res.status(400).json({ error: "contentId is required" });
    }

    if (action === "add_to_watchlist") {
      await db.collection("watchlist").updateOne(
        { clerkUserId: userId, contentId },
        {
          $set: {
            clerkUserId: userId,
            contentId,
            contentTitle: req.body?.contentTitle || null,
            contentType: req.body?.contentType || null,
            addedAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    if (action === "remove_from_watchlist") {
      await db.collection("watchlist").deleteOne({
        clerkUserId: userId,
        contentId,
      });
    }

    await db.collection("watchlist_events").insertOne({
      clerkUserId: userId,
      action: action || null,
      contentId,
      contentTitle: req.body?.contentTitle || null,
      contentType: req.body?.contentType || null,
      createdAt: new Date(),
      clientTimestamp: req.body?.timestamp ? new Date(req.body.timestamp) : null,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || null,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Watchlist error:", error);
    return res.status(500).json({ error: "Failed to update watchlist" });
  }
});

export default app;
