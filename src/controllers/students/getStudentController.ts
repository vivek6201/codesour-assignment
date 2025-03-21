import { Request, Response } from "express";
import { getStudentByRegNo } from "../../services/students";
import { statusCodes } from "../../lib/utils";

const getStudentController = async (req: Request, res: Response) => {
  const { regNo } = req.params;

  const student = await getStudentByRegNo(regNo);

  if (!student.success) {
    res.status(statusCodes.notFound).json({
      success: student.success,
      message: student.error,
    });
    return;
  }

  res.status(statusCodes.success).json({
    success: true,
    data: student.data,
  });
};

export default getStudentController;
