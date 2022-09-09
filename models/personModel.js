import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
});

personSchema.plugin(passportLocalMongoose);

export default mongoose.model("person", personSchema);
