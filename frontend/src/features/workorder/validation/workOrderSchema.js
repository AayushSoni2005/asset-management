import { z } from "zod";

export const workOrderSchema = z.object({
    issueId: z
        .number({
            required_error: "Issue is required.",
        })
        .positive(),

    technicianId: z
        .number({
            required_error: "Technician is required.",
        })
        .positive(),

    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(500, "Title must not exceed 500 characters."),

    repairNotes: z
        .string()
        .max(2000, "Repair notes must not exceed 2000 characters.")
        .optional()
        .or(z.literal("")),
});

export const DEFAULT_VALUES = {
    issueId: null,
    technicianId: null,
    title: "",
    repairNotes: "",
};