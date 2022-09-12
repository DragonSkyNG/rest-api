import express from "express";
import {
  logout,
  getPeople,
  getPersonById,
  updatePersonById,
  deletePersonById,
  deletePeople,
} from "../controller/personController.js";
const router = express.Router();

router.post("/register", registerPerson);
router.post("/login", loginPerson);
router.post("/logout", logout);
router.get("/getAll", getPeople);
router.get("/get/:id", getPersonById);
router.put("/update/:id", updatePersonById);
router.delete("/delete/:id", deletePersonById);
router.delete("/delete", deletePeople);

export default router;
