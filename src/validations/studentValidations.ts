import { z } from "zod";

export const student = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 characters required")
    .max(16, "Maximum 16 characters required"),
  regNo: z
    .string()
    .min(3, "Minimum 3 characters required")
    .max(16, "Maximum 16 characters required"),
  class: z
    .string()
    .min(3, "Minimum 3 characters required")
    .max(16, "Maximum 16 characters required"),
  contactNumber: z
    .string()
    .min(10, "Minimum 10 digits required")
    .max(10, "Maximum 10 digits required"),
  rollNo: z.number().min(1, "minimum 1 is required"),
});

export type AddStudentType = z.infer<typeof student>;
export type UpdateStudentType = z.infer<ReturnType<typeof student.partial>>;
