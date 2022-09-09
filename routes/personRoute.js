import express from "express";
import {
  createPerson,
  getPeople,
  getPersonById,
  updatePersonById,
  deletePersonById,
} from "../controller/personController";
const router = express.Router();

router.post("/addNew", createPerson);
router.get("/getAll", getPeople);
router.get("/get/:id", getPersonById);
router.put("/update/:id", updatePersonById);
router.delete("/delete/:id", deletePersonById);

export default router;
