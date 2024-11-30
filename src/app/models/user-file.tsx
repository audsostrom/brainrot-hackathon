import mongoose, { Schema, models } from "mongoose";

/** For carrying over user progress across an entire course */
const userFileSchema = new Schema(
  {
    guideId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
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

const UserFile = models?.File || mongoose.model("UserFile", userFileSchema);
export default UserFile;