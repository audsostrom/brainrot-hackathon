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
    startingFile: { // i.e. app/layout.tsx
      type: String,
      required: true,
    },
    content: { // in markdown format
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Guide = models?.Guide || mongoose.model("Guide", guideSchema);
export default Guide;