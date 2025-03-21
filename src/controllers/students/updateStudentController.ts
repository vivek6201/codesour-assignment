import { Request, Response } from "express";
import { getStudentByRegNo, updateStudent } from "../../services/students";
import { statusCodes } from "../../lib/utils";
import { student } from "../../validations/studentValidations";

const updateStudentController = async (req: Request, res: Response) => {
  const { regNo } = req.params;
  const reqBody = req.body;

  const { data, success, error } = await student
    .partial()
    .safeParseAsync(reqBody);

  if (!success) {
    res.status(statusCodes.badRequest).json({
      success,
      error: error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    });
    return;
  }

  const result = await getStudentByRegNo(regNo);

  if (!result.success) {
    res.status(statusCodes.notFound).json({
      success: false,
      error: "Student not found",
    });
    return;
  }

  const updateResult = await updateStudent(data);

  if (!updateResult.success) {
    res.status(statusCodes.badRequest).json({
      success: false,
      error: "Failed to update student!",
    });
    return;
  }

  res.status(statusCodes.notFound).json({
    success: true,
    error: "Student updated successfully!",
  });
};

export default updateStudentController;
