import z from 'zod';

export const DeleteUserSchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    avatar_id: z.string().min(5),
    bio: z.string().nullable(),
    created_at: z.string(),
});

export const DeleteUserResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({}),
});

export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>;

export type DeleteUserError = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
