import bcrypt from "bcrypt";
import personModel from "../models/personModel";

export const registerPerson = async (req, res) => {
  try {
    const { password, ...fields } = req.body;
    await personModel.register(fields, password, (error) => {
      if (error) {
        console.error(error);
      }
    });
    res.status(201).send("Person registered successfully");
  } catch (error) {
    console.error(error);
  }
};
export const loginPerson = (req, res) => {
  try {
    const person = new personModel({
      username: req.body.username,
      password: req.body.password,
    });
    req.login(person, (error) => {
      if (error) {
        console.error(error);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send("successfull login");
        });
      }
    });
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
