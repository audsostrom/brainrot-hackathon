import mongoose, { Schema, models } from "mongoose";

const guideSchema = new Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Guide = models.Guide || mongoose.model("Guide", guideSchema);
export default Guide;