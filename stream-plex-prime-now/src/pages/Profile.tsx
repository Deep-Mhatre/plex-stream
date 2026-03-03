import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Profile = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = await getToken();
        const response = await fetch("/api/me", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [getToken]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-10 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <Card className="max-w-xl">
          <CardHeader>Account Details</CardHeader>
          <CardContent>
            {loading && <p>Loading profile...</p>}
            {error && <p className="text-destructive">{error}</p>}
            {!loading && !error && profile && (
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Name</span>
                  <div className="text-base font-medium">
                    {[profile.firstName, profile.lastName].filter(Boolean).join(" ") || "—"}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email</span>
                  <div className="text-base font-medium">{profile.email || "—"}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">User ID</span>
                  <div className="text-sm font-mono break-all">{profile.id}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
