import mongoose, { Schema, models } from "mongoose";

/** For tracking a user's completion of a guide */
const userGuideSchema = new Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    completed: {
      type: Array, // array of guide ids that match to a boolean
      required: true,
    },
    files: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const UserGuide = models?.UserGuide || mongoose.model("UserGuide", userGuideSchema);
export default UserGuide;