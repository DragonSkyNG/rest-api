import express from "express";
const router = express.Router();

router.post("/addNew", createPerson);
router.get("/getAll", getPerson);
router.get("/get/:id", getPersonById);
router.put("/update/:id", updatePersonById);
router.delete("/delete/:id", deletePersonById);

export default router;
