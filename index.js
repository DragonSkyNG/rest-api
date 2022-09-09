import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";
import personRoute from "./routes/personRoute.js";
import passport from "passport";
import personModel from "./models/personModel.js";

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

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "somesecretstring",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(personModel.createStrategy());

passport.serializeUser(personModel.serializeUser());
passport.deserializeUser(personModel.deserializeUser());

app.use("/person", personRoute);

app.get("*", (req, res) => {
  res.status(404).send("This page doesn't exist");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectToDB();
  console.log(`server started on port: ${port}`);
});
