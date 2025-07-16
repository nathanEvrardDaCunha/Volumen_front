import z from 'zod';
import { BookSchema } from '../book-schema';

// Add Type Suffix for every type schema to enhance formatting ?
export const SaveBookSchema = z.object({
    data: BookSchema,
});

export type SaveBookType = z.infer<typeof SaveBookSchema>;

export const SaveBookResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({}),
});

export type SaveBookResponseType = z.infer<typeof SaveBookResponseSchema>;

export type SaveBookErrorType = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
