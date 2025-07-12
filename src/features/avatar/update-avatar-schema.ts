import z from 'zod';

export const FetchAvatarSchema = z.object({
    avatar_id: z.string().min(5),
});

export const FetchAvatarResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: FetchAvatarSchema,
});

export type FetchAvatarResponse = z.infer<typeof FetchAvatarResponseSchema>;

export type FetchAvatarError = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
