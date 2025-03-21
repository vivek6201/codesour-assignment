import { Request, Response } from "express";
import { student } from "../../validations/studentValidations";
import { statusCodes } from "../../lib/utils";
import { createStudent } from "../../services/students";

const addStudentController = async (req: Request, res: Response) => {
  const data = req.body;
  const parsedData = await student.safeParseAsync(data);

  if (!parsedData.success) {
    res.status(statusCodes.badRequest).json({
      success: parsedData.success,
      error: parsedData.error.issues.map((issue) => {
        return {
          field: issue.path[0],
          message: issue.message,
        };
      }),
    });
    return;
  }

  const result = await createStudent(parsedData.data);
  if (result.success) {
    res.status(statusCodes.created).json({
      success: true,
      message: "User created successfully!",
      data: result.data
    });
  } else {
    console.error(result.error);
    res.status(statusCodes.internalServerError).json({
      success: false,
      message: result.error,
    });
  }
};

export default addStudentController;
