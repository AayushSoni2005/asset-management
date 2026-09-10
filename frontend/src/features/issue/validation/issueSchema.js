import { z } from "zod";

export const issueSchema = z.object({
    equipmentId: z
        .number({
            required_error: "Equipment is required.",
        })
        .positive("Equipment is required."),

    reportedByEmployeeId: z
        .number({
            required_error: "Reporter is required.",
        })
        .positive("Reporter is required."),

    assignedToEmployeeId: z
        .number()
        .positive()
        .nullable()
        .optional(),

    title: z
        .string()
        .trim()
        .min(1, "Issue title is required.")
        .max(500, "Issue title must not exceed 500 characters."),

    description: z
        .string()
        .trim()
        .min(1, "Issue description is required.")
        .max(2000, "Issue description must not exceed 2000 characters."),

    priority: z
        .string()
        .min(1, "Issue priority is required."),
});

export const DEFAULT_VALUES = {
    equipmentId: null,
    reportedByEmployeeId: null,
    assignedToEmployeeId: null,
    title: "",
    description: "",
    priority: "",
};