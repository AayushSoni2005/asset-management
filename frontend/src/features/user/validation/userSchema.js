import { z } from "zod";

const emailSchema = z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(100, "Email must not exceed 100 characters.");

const roleSchema = z.enum(
    ["ADMIN", "EMPLOYEE", "TECHNICIAN"],
    {
        errorMap: () => ({
            message: "Please select a role.",
        }),
    }
);

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must not exceed 100 characters.");

export const createUserSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema,
    enabled: z.boolean(),
});

export const updateUserSchema = z.object({
    email: emailSchema,
    password: z
        .string()
        .max(100, "Password must not exceed 100 characters.")
        .optional()
        .or(z.literal("")),
    role: roleSchema,
    enabled: z.boolean(),
});

export const defaultCreateUserValues = {
    email: "",
    password: "",
    role: "EMPLOYEE",
    enabled: true,
};

export const defaultUpdateUserValues = {
    email: "",
    password: "",
    role: "EMPLOYEE",
    enabled: true,
};