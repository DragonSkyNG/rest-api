import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("person", personSchema);
