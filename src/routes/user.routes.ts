import { Router } from "express";
import getAllStudentsController from "../controllers/students/getAllStudentsController";
import addStudentController from "../controllers/students/addStudentController";
import getStudentController from "../controllers/students/getStudentController";
import updateStudentController from "../controllers/students/updateStudentController";
import deleteStudentController from "../controllers/students/deleteStudentController";

const router = Router();

router.post("/", addStudentController).get("/", getAllStudentsController);
router
  .get("/:regNo", getStudentController)
  .put("/:regNo", updateStudentController)
  .delete("/:regNo", deleteStudentController);

export default router;
