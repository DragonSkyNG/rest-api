import express from "express";
import { validateSessionToken } from "../authValidation/authValidation.js";
import {
  getPeople,
  getPersonById,
  updatePersonById,
  deletePersonById,
  deletePeople,
} from "../controller/personController.js";
const router = express.Router();

router.get("/getAll", validateSessionToken, getPeople);
router.get("/get/:id", validateSessionToken, getPersonById);
router.put("/update/:id", validateSessionToken, updatePersonById);
router.delete("/delete/:id", validateSessionToken, deletePersonById);
router.delete("/delete", validateSessionToken, deletePeople);

export default router;
