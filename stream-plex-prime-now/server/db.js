import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "plexstream";

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env");
}

let client;
let db;

export const getDb = async () => {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
};
