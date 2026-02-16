import { z } from "zod";

export const schema = z
    .object({
        email: z.email(),
        username: z.string().min(4, "Username must be at least 4 characters"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Passwords must match"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type FormFields = z.infer<typeof schema>;