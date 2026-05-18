import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Blog from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";
import mongoose from "mongoose";
import { isRequestAuthenticated } from "@/lib/auth";

export async function GET(req: Request) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ isPublished: true });

    let dbSizeMB = 0;
    try {
      if (mongoose.connection.db) {
        const stats = await mongoose.connection.db.command({ dbStats: 1 });
        dbSizeMB = (stats.dataSize || 0) / (1024 * 1024);
      }
    } catch (e) {
      console.error("Error fetching db stats", e);
    }

    let cloudinaryUsage = null;
    try {
      const result = await cloudinary.api.usage();
      cloudinaryUsage = {
        plan: result.plan,
        bandwidth: result.bandwidth.usage,
        bandwidth_limit: result.bandwidth.limit,
        storage: result.storage.usage,
        storage_limit: result.storage.limit,
        credits: result.credits.usage,
        credits_limit: result.credits.limit,
      };
    } catch (e) {
      console.error("Error fetching cloudinary stats", e);
    }

    return NextResponse.json({
      mongodb: {
        totalBlogs,
        publishedBlogs,
        dbSizeMB: Number(dbSizeMB.toFixed(2)),
        limitMB: 512,
      },
      cloudinary: cloudinaryUsage,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
