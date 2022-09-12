import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import personRoute from "./routes/personRoute.js";
import authRoute from "./routes/authRoute.js";
const app = express();

dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongodb cluster successfully");
  } catch (error) {
    console.error(error);
  }
};

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/person", personRoute);
app.use("/auth", authRoute);

app.get("*", (req, res) => {
  res.status(404).send("This page doesn't exist");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectToDB();
  console.log(`server started on port: ${port}`);
});
