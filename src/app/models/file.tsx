import mongoose, { Schema, models } from "mongoose";

/** For storing the starting files specific to a guide */
const fileSchema = new Schema(
  {
    guideId: {
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

const File = models.File || mongoose.model("File", fileSchema);
export default File;