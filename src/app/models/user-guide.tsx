import mongoose, { Schema, models } from "mongoose";

const userGuideSchema = new Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    filename: {
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

const UserGuide = models.UserGuide || mongoose.model("UserGuide", userGuideSchema);
export default UserGuide;