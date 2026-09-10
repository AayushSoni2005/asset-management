import { z } from "zod";

export const EQUIPMENT_STATUS = [
    "AVAILABLE",
    "ASSIGNED",
    "MAINTENANCE",
    "RETIRED",
    "LOST",
    "DAMAGED",
];

export const DEFAULT_VALUES = {
    assetTag: "",
    name: "",
    category: "",
    brand: "",
    model: "",
    serialNumber: "",
    location: "",
    status: "AVAILABLE",
    assignedToEmployeeId: null,
};

export const equipmentSchema = z
    .object({
        assetTag: z
            .string()
            .trim()
            .min(1, "Asset tag is required.")
            .max(50, "Asset tag must not exceed 50 characters."),

        name: z
            .string()
            .trim()
            .min(1, "Equipment name is required.")
            .max(100, "Equipment name must not exceed 100 characters."),

        category: z
            .string()
            .trim()
            .min(1, "Category is required.")
            .max(100, "Category must not exceed 100 characters."),

        brand: z
            .string()
            .trim()
            .min(1, "Brand is required.")
            .max(100, "Brand must not exceed 100 characters."),

        model: z
            .string()
            .trim()
            .min(1, "Model is required.")
            .max(100, "Model must not exceed 100 characters."),

        serialNumber: z
            .string()
            .trim()
            .min(1, "Serial number is required.")
            .max(100, "Serial number must not exceed 100 characters."),

        location: z
            .string()
            .trim()
            .max(100, "Location must not exceed 100 characters.")
            .optional()
            .or(z.literal("")),

        status: z.enum(EQUIPMENT_STATUS),

        assignedToEmployeeId: z.number().nullable().optional(),
    })
    .superRefine((data, ctx) => {
        if (
            data.status === "ASSIGNED" &&
            !data.assignedToEmployeeId
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["assignedToEmployeeId"],
                message: "Assigned employee is required.",
            });
        }
    });