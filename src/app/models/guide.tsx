import mongoose, { Schema, models } from "mongoose";

export interface FilesToTrackType {
    file: string;
    content: string;
}

export type GuideType = {
  courseId: string;
  title: string;
  description: string;
  startingFile: string;
  content: string;
  filesToTrack: string[];
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

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
    filesToTrack: {
      type: Array,
      required: true,
    },
    content: { // in markdown format
      type: String,
      required: true,
    },
    checklist: { // in markdown format
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Guide = models?.Guide || mongoose.model("Guide", guideSchema);
export default Guide;