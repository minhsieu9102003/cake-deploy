import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },

  value: {
    type: String,
    required: true
  },

  image: {
    type: String,
  }
});

export default Card = mongoose.model("card", cardSchema);