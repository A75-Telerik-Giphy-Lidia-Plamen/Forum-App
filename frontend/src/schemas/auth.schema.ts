import { z } from "zod";

export const schema = z
    .object({
        first_name: z
            .string()
            .min(4, "First name must be at least 4 characters")
            .max(32, "First name must be at most 32 characters"),

        last_name: z
            .string()
            .min(4, "Last name must be at least 4 characters")
            .max(32, "Last name must be at most 32 characters"),
        email: z
            .email(),
        username: z
            .string()
            .min(4, "Username must be at least 4 characters"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: z
            .string()
            .min(8, "Passwords must match"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type FormFields = z.infer<typeof schema>;