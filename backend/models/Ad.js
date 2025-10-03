import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    role: { type: String, required: true },
    img: { type: String, required: true },
    width: { type: String, required: true },
    link: String,
    order: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Ad', AdSchema);
