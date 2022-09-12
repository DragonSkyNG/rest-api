import express from "express";
import {
  registerPerson,
  loginPerson,
  logoutPerson,
} from "../controller/authController.js";
const router = express.Router();

router.post("/register", registerPerson);
router.post("/login", loginPerson);
router.post("/logout", logoutPerson);

export default router;
