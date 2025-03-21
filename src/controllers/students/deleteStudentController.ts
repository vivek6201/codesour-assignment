import { Request, Response } from "express";
import { deleteStudent, getStudentByRegNo } from "../../services/students";
import { statusCodes } from "../../lib/utils";

const deleteStudentController = async (req: Request, res: Response) => {
  const { regNo } = req.params;

  if (!regNo) {
    res.status(statusCodes.unauthorized).json({
      success: false,
      message: "regNo is required",
    });
    return;
  }

  const { success } = await getStudentByRegNo(regNo);

  if (!success) {
    res.status(statusCodes.notFound).json({
      success: false,
      error: "Student not found!",
    });
    return;
  }

  const result = await deleteStudent(regNo);

  if (!result.success) {
    res.status(statusCodes.badRequest).json({
      success: false,
      message: "Failed to delete student!",
    });
    return;
  }

  res.status(statusCodes.success).json({
    success: true,
    message: `Student with registration number: ${regNo} is removed successfully!`,
  });
};

export default deleteStudentController;
