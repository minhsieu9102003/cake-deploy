import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  createdAt: {
    type: Date,
    required: true,
  },

  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'card'
  }],
});

const Course = mongoose.model("course", courseSchema);
export default Course;