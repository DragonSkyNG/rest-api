import passport from "passport";
import personModel from "../models/personModel.js";

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
export const logout = (req, res) => {
  req.logout();
  res.send("Successfully loged out");
};
export const getPeople = async (req, res) => {
  try {
    const people = await personModel.find({}, { hash: 0, salt: 0 });
    res.status(202).json(people);
  } catch (error) {
    console.error(error);
  }
};
export const getPersonById = async (req, res) => {
  try {
    const person = await personModel.findById(req.params.id);
    res.status(200).json(person);
  } catch (error) {
    console.error(error);
  }
};
export const updatePersonById = async (req, res) => {
  try {
    const updatedPerson = await personModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
    );
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.error(error);
  }
};
export const deletePersonById = async (req, res) => {
  try {
    const person = await personModel.findByIdAndDelete(req.params.id);
    res.status(200).send(`User ${person.username} was successfully deleted`);
  } catch (error) {
    console.error(error);
  }
};
export const deletePeopleByLastname = async (req, res) => {
  try {
    await personModel.deleteMany({ lastName: req.body.lastname });
    res.status(200).send("Successfully deleted entries");
  } catch (error) {
    console.error(error);
  }
};
