import z from 'zod';

export const FetchUserSchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    avatar_id: z.string().min(5),
    bio: z.string().nullable(),
    created_at: z.string(),
});

export const FetchUserResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: FetchUserSchema,
});

export type FetchUserResponse = z.infer<typeof FetchUserResponseSchema>;

export type FetchUserError = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
