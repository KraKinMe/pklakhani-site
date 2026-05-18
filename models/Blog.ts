import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  previousSlugs: string[];
  category: string; // Category slug
  content: string; // The HTML content from React-Quill
  excerpt: string;
  coverImage: string; // Cloudinary URL
  isPublished: boolean;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    previousSlugs: [{ type: String }],
    category: { type: String, default: "" },
    content: { type: String, required: true },
    excerpt: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null, expires: 0 }, // TTL Index: Auto-deletes doc when date is reached
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from compiling the model multiple times in development
// and clear the cache to ensure schema updates (like previousSlugs) are picked up by Next.js HMR
if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

export default mongoose.model<IBlog>('Blog', BlogSchema);
