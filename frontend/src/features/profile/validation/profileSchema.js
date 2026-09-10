import { z } from "zod";

export const profileSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First name is required.")
        .max(50, "First name must not exceed 50 characters."),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required.")
        .max(50, "Last name must not exceed 50 characters."),

    phoneNumber: z
        .string()
        .trim()
        .regex(
            /^[0-9]{10}$/,
            "Phone number must contain exactly 10 digits."
        ),

    department: z
        .string()
        .trim()
        .min(1, "Department is required.")
        .max(100, "Department must not exceed 100 characters."),

    designation: z
        .string()
        .trim()
        .min(1, "Designation is required.")
        .max(100, "Designation must not exceed 100 characters."),
});