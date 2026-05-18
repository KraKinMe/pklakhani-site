import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Blog from "@/models/Blog";
import slugify from "slugify";
import cloudinary from "@/lib/cloudinary";
import { isRequestAuthenticated } from "@/lib/auth";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { revalidateBlogPaths } from "@/lib/revalidate-blog";
import { notifyGoogleUrlUpdated, notifyGoogleUrlDeleted } from "@/lib/indexing";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (body.title && body.title !== existingBlog.title) {
      if (!body.slug || body.slug === existingBlog.slug) {
        let newSlug = slugify(body.title, { lower: true, strict: true });
        const duplicate = await Blog.findOne({ slug: newSlug, _id: { $ne: id } });
        if (duplicate) {
          newSlug = `${newSlug}-${Math.random().toString(36).substring(2, 7)}`;
        }
        body.slug = newSlug;
      }
    }

    if (typeof body.content === "string") {
      body.content = sanitizeBlogHtml(body.content);
    }

    if (body.content && (!body.excerpt || body.excerpt.trim() === "")) {
      const plainText = body.content.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
      body.excerpt = plainText.substring(0, 160);
      if (plainText.length > 160) body.excerpt += "...";
    }

    const updateDoc: {
      $set: Record<string, unknown>;
      $addToSet?: { previousSlugs: string };
    } = { $set: { ...body } };

    if (body.slug && body.slug !== existingBlog.slug) {
      updateDoc.$addToSet = { previousSlugs: existingBlog.slug };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateDoc, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    revalidateBlogPaths(existingBlog.slug, updatedBlog.slug);

    // Asynchronously notify Google
    if (updatedBlog.isPublished) {
      notifyGoogleUrlUpdated(`/blogs/${updatedBlog.slug}`).catch(console.error);
    } else {
      // If it was unpublished, tell Google to remove it
      notifyGoogleUrlDeleted(`/blogs/${updatedBlog.slug}`).catch(console.error);
    }

    if (existingBlog.slug !== updatedBlog.slug) {
      notifyGoogleUrlDeleted(`/blogs/${existingBlog.slug}`).catch(console.error);
    }

    return NextResponse.json(updatedBlog);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const imageUrls: string[] = [];
    if (deletedBlog.coverImage) imageUrls.push(deletedBlog.coverImage);

    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = imgRegex.exec(deletedBlog.content)) !== null) {
      imageUrls.push(match[1]);
    }

    const publicIds = imageUrls
      .map((url) => {
        if (!url || !url.includes("cloudinary.com")) return null;
        try {
          const parts = url.split("/upload/");
          if (parts.length > 1) {
            const pathSegments = parts[1].split("/");
            if (
              pathSegments[0].startsWith("v") &&
              !isNaN(parseInt(pathSegments[0].substring(1), 10))
            ) {
              pathSegments.shift();
            }
            const publicIdWithExtension = pathSegments.join("/");
            const lastDotIndex = publicIdWithExtension.lastIndexOf(".");
            return lastDotIndex !== -1
              ? publicIdWithExtension.substring(0, lastDotIndex)
              : publicIdWithExtension;
          }
        } catch {
          return null;
        }
        return null;
      })
      .filter(Boolean) as string[];

    for (const publicId of publicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.error(`Failed to delete Cloudinary image: ${publicId}`, e);
      }
    }

    revalidateBlogPaths(deletedBlog.slug);

    // Asynchronously notify Google to remove the deleted URL
    notifyGoogleUrlDeleted(`/blogs/${deletedBlog.slug}`).catch(console.error);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
