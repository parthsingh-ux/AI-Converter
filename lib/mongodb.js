import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
};

let client;
let clientPromise;

export async function getDb() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured in environment variables.");
  }

  if (!clientPromise) {
    try {
      client = new MongoClient(uri, options);
      clientPromise = client.connect().catch((err) => {
        clientPromise = null;
        throw err;
      });
    } catch (err) {
      clientPromise = null;
      throw err;
    }
  }

  const connectedClient = await clientPromise;
  const dbName = process.env.MONGODB_DB_NAME || "ai_converter";
  return connectedClient.db(dbName);
}

export default function getClientPromise() {
  return clientPromise;
}
