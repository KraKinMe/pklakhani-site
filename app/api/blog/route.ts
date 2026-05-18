import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Blog from "@/models/Blog";
import slugify from "slugify";
import { isRequestAuthenticated } from "@/lib/auth";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { revalidateBlogPaths } from "@/lib/revalidate-blog";

export async function GET(req: Request) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await req.json();

    let slug = body.slug || slugify(body.title, { lower: true, strict: true });
    const existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    const newBlog = new Blog({
      ...body,
      slug,
      content: sanitizeBlogHtml(body.content || ""),
    });

    await newBlog.save();
    revalidateBlogPaths(slug);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
