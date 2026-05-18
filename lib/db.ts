import mongoose from "mongoose";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as typeof globalThis & { mongoose?: MongooseCache }).mongoose;

if (!cached) {
  cached = (global as typeof globalThis & { mongoose?: MongooseCache }).mongoose =
    { conn: null, promise: null };
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim());
}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable (e.g. in .env.local or your hosting provider dashboard).",
    );
  }
  return uri;
}

async function connectToDatabase() {
  const uri = getMongoUri();

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connectToDatabase;
