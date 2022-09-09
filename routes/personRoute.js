import express, { application } from "express";
import {
  registerPerson,
  loginPerson,
  logout,
  getPeople,
  getPersonById,
  updatePersonById,
  deletePersonById,
  deletePeopleByLastname,
} from "../controller/personController.js";
const router = express.Router();

router.post("/register", registerPerson);
router.post("/login", loginPerson);
router.post("/logout", logout);
router.get("/getAll", getPeople);
router.get("/get/:id", getPersonById);
router.put("/update/:id", updatePersonById);
router.delete("/delete/:id", deletePersonById);
router.delete("/delete", deletePeopleByLastname);

export default router;
