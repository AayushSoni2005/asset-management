import { z } from "zod";

const employeeSchema = z.object({
    userId: z.coerce
        .number({
            required_error: "User is required",
            invalid_type_error: "User is required",
        })
        .positive("User is required"),

    employeeId: z
        .string()
        .min(1, "Employee ID is required"),

    firstName: z
        .string()
        .min(1, "First name is required"),

    lastName: z
        .string()
        .min(1, "Last name is required"),

    phoneNumber: z
        .string()
        .min(10, "Phone number is required"),

    department: z
        .string()
        .min(1, "Department is required"),

    designation: z
        .string()
        .min(1, "Designation is required"),

    status: z.enum([
        "ACTIVE",
        "INACTIVE",
        "ON_LEAVE",
    ]),
});

export default employeeSchema;