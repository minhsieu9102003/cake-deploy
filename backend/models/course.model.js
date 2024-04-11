import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'card'
  }],
}, { timestamps: true });

const Course = mongoose.model("course", courseSchema);
export default Course;