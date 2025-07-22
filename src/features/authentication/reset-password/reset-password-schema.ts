import z from 'zod';

export const ResetPasswordSchema = z.object({
    email: z.string().email(),
});

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

export const ResetPasswordResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({}),
});

export type ResetPasswordResponseType = z.infer<
    typeof ResetPasswordResponseSchema
>;

export type ResetPasswordErrorType = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
