import z from 'zod';

export const LogoutUserResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({ data: z.null() }),
});

export type LogoutUserResponse = z.infer<typeof LogoutUserResponseSchema>;

export type LogoutUserError = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
