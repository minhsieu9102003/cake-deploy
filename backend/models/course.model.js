import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  folderId: {
    type: Schema.Types.ObjectId,
    ref: 'folder',
    required: true,
  }

}, { timestamps: true });

const Course = mongoose.model("course", courseSchema);
export default Course;