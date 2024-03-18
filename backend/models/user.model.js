import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters"]
  },

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },

  folders: [{
    type: Schema.Types.ObjectId,
    ref: 'folder'
  }],

  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'course',
  }],
});

export default User = mongoose.model("user", userSchema);