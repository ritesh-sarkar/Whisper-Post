// models/ShortLink.js
import mongoose from "mongoose";

const shortLinkSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  username: { type: String, required: true },              // target username (e.g. "ritesh")
  fullUrl: { type: String, required: true },               // e.g. https://whisper-post.vercel.app/message/ritesh
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const ShortLink = mongoose.models.ShortLink || mongoose.model("ShortLink", shortLinkSchema);

export default ShortLink;
