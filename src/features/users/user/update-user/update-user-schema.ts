import z from 'zod';

// Update avatar into another file

export const UpdateUserFormSchema = z.object({
    username: z.string().min(5).optional().or(z.literal('')),
    email: z.string().email().optional().or(z.literal('')),
    password: z
        .string()
        .min(8)
        .refine((password) => /[A-Z]/.test(password), {
            message: 'Password must contain at least one uppercase letter',
        })
        .refine((password) => /[a-z]/.test(password), {
            message: 'Password must contain at least one lowercase letter',
        })
        .refine((password) => /[0-9]/.test(password), {
            message: 'Password must contain at least one number',
        })
        .refine((password) => /[!@#$%^&*]/.test(password), {
            message: 'Password must contain at least one special character',
        })
        .optional()
        .or(z.literal('')),
    bio: z.string().optional().or(z.literal('')),
});

export type UpdateUserFormType = z.infer<typeof UpdateUserFormSchema>;

export const UpdateUserResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({}),
});

export type UpdateUserErrorType = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
