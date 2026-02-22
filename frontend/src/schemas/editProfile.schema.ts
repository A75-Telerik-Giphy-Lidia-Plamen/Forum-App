import z from "zod";

export const editProfileSchema = z
    .object({
        first_name: z
            .string()
            .min(4)
            .max(32),
        last_name: z
            .string()
            .min(4)
            .max(32),
        bio: z.
            string()
            .max(500)
            .nullable()
            .optional(),
        avatar_url: z
            .string()
            .nullable()
            .optional(),
});

export type FormFields = z.infer<typeof editProfileSchema>;