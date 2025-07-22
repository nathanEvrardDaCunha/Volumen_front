import z from 'zod';
import { BookSchema } from '../book-schema';

export const FetchBookFormSchema = z.object({
    query: z.string().min(1),
});

export type FetchBookFormType = z.infer<typeof FetchBookFormSchema>;

export const FetchBookResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({ books: z.array(BookSchema) }),
});

export type FetchBookResponseType = z.infer<typeof FetchBookResponseSchema>;

export type FetchBookErrorType = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
