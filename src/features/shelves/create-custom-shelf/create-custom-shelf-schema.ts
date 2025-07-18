import z from 'zod';

export const CreateCustomShelfFormSchema = z.object({
    name: z.string().min(1).max(100),
});

export type CreateCustomShelfFormType = z.infer<
    typeof CreateCustomShelfFormSchema
>;

export const CreateCustomShelfResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({}),
});

export type CreateCustomShelfError = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
