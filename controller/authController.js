import bcrypt from "bcrypt";
import personModel from "../models/personModel.js";
import jwt from "jsonwebtoken";
// import cryptoRandomString from "crypto-random-string";

export const registerPerson = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newPerson = new personModel({
      ...req.body,
      isAdmin: false,
      // secret: cryptoRandomString({ length: 20, type: "base64" }),
      password: hash,
    });
    await newPerson.save();
    res.status(201).send("New user is created");
  } catch (error) {
    console.error(error);
    res.status(405).send(error);
  }
};

export const loginPerson = async (req, res) => {
  try {
    const person = await personModel.findOne({ username: req.body.username });
    if (!person) {
      res.status(404).send("User not found");
    }
    const pwdIsCorrect = await bcrypt.compare(
      req.body.password,
      person.password
    );
    if (!pwdIsCorrect) {
      return res.status(404).send("Username or password is incorrect");
    }
    const token = jwt.sign(
      { id: person._id, isAdmin: person.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1 hour",
      }
    );

    return res
      .cookie("session_token", token, { httpOnly: true })
      .status(201)
      .send("successfully logged in");
  } catch (error) {
    console.error(error);
  }
};
export const logoutPerson = async (req, res) => {
  await req.logout((error) => {
    if (error) {
      return next(error);
    }
  });
  res.send("Successfully loged out");
};
