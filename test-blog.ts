import mongoose from "mongoose";
import Blog from "./models/Blog";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/pklakhani"; // Actually wait, I need the real uri. 
// I will just require the next config or let's use the local db.ts.
