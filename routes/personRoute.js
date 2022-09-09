import express from "express";
import {
  registerPerson,
  loginPerson,
  getPeople,
  getPersonById,
  updatePersonById,
  deletePersonById,
} from "../controller/personController";
const router = express.Router();

router.post("/register", registerPerson);
router.post("login", loginPerson);
router.get("/getAll", getPeople);
router.get("/get/:id", getPersonById);
router.put("/update/:id", updatePersonById);
router.delete("/delete/:id", deletePersonById);

export default router;
