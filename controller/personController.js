import personModel from "../models/personModel.js";

export const getPeople = async (req, res) => {
  try {
    const people = await personModel.find({}, { password: 0 });
    res.status(202).json(people);
  } catch (error) {
    console.error(error);
  }
};
export const getPersonById = async (req, res) => {
  try {
    const person = await personModel.findById(req.params.id, { password: 0 });
    res.status(200).json(person);
  } catch (error) {
    console.error(error);
  }
};
export const updatePersonById = async (req, res) => {
  try {
    const updatedPerson = await personModel.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body,
        isAdmin: req.person.isAdmin ? req.body.isAdmin : "false",
      },
    });
    const { password, ...rest } = updatedPerson["_doc"];
    res.status(200).json(rest);
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
export const deletePeople = async (req, res) => {
  try {
    await personModel.deleteMany({ ...req.body });
    res.status(200).send("Successfully deleted entries");
  } catch (error) {
    console.error(error);
  }
};
