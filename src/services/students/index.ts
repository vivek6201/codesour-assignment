import prisma from "../../config/db";
import {
  AddStudentType,
  UpdateStudentType,
} from "../../validations/studentValidations";

export const getAllStudents = async (pageNo: number) => {
  const pageSize = 10;
  const skip = (pageNo - 1) * pageSize;

  try {
    const students = await prisma.student.findMany({
      skip: skip,
      take: pageSize,
      where: {
        status: true,
      },
      orderBy: {
        regNo: "asc",
      },
    });

    return {
      success: true,
      data: students,
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const createStudent = async (data: AddStudentType) => {
  try {
    let student = await prisma.student.findUnique({
      where: {
        regNo: data.regNo,
      },
    });

    if (student) {
      return {
        success: false,
        error: "student already exists!",
      };
    }

    student = await prisma.student.create({
      data: {
        name: data.name,
        contactNumber: data.contactNumber,
        class: data.class,
        regNo: data.regNo,
        rollNo: data.rollNo,
      },
    });

    return {
      success: true,
      message: "student created successfully!",
      data: student,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Internal server error",
    };
  }
};

export const getStudentByRegNo = async (regNo: string) => {
  try {
    let student = await prisma.student.findUnique({
      where: {
        regNo: regNo,
      },
    });

    if (!student) {
      return {
        success: false,
        error: "Student not found",
        data: null,
      };
    }

    return {
      success: true,
      message: "Student found successfully!",
      data: student,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "failed to search for student",
    };
  }
};

export const updateStudent = async (data: UpdateStudentType) => {
  try {
    await prisma.student.update({
      where: {
        regNo: data.regNo,
      },
      data: {
        ...data,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const deleteStudent = async (regNo: string) => {
  try {
    await prisma.student.update({
      where: {
        regNo,
      },
      data: {
        status: false,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
