import { Request, Response } from "express";
import { getAllStudents } from "../../services/students";
import { statusCodes } from "../../lib/utils";

const getAllStudentsController = async (req: Request, res: Response) => {
  const { pageNo } = req.query;
  const pageNumber = pageNo ? parseInt(pageNo as string, 10) : 1;
  const { success, data } = await getAllStudents(pageNumber);

  if (!success) {
    res.status(statusCodes.badRequest).json({
      success: false,
      message: "Failed to get all students",
    });
    return;
  }
  res.status(statusCodes.success).json({
    success: true,
    data,
  });
};

export default getAllStudentsController;
