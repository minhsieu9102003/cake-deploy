import mongoose, { Schema } from "mongoose";

const folderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  createdAt: {
    type: Date,
    required: true
  },

  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'course'
  }]
});

export default Folder = mongoose.model("folder", folderSchema);