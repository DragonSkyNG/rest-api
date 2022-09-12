import express from "express";
import {
  validatePersonSessionToken,
  validateAdminSessionToken,
} from "../authValidation/authValidation.js";
import {
  getPeople,
  getPersonById,
  updatePersonById,
  deletePersonById,
  deletePeople,
} from "../controller/personController.js";
const router = express.Router();

router.get("/getAll", validateAdminSessionToken, getPeople);
router.get("/get/:id", validatePersonSessionToken, getPersonById);
router.put("/update/:id", validatePersonSessionToken, updatePersonById);
router.delete("/delete/:id", validatePersonSessionToken, deletePersonById);
router.delete("/delete", validateAdminSessionToken, deletePeople);

export default router;
