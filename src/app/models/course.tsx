import mongoose, { Schema, models } from "mongoose";

const courseSchema = new Schema(
  {
    guideIds: {
      type: [String], // ordering matters
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
  },
  { timestamps: true }
);

const Course = models?.Course || mongoose.model("Course", courseSchema);
export default Course;