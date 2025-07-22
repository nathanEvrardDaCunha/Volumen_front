import z from 'zod';

export const LoginFormSchema = z.object({
    email: z.string().email(),
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
        }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const LoginResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({
        accessToken: z.string().min(1),
    }),
});

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;

export type LoginErrorType = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
