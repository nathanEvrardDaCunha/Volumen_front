import z from 'zod';
import { BookSchema } from '../../books/book-schema';

const ShelfWithoutMetadataSchema = z.object({
    name: z.string(),
    isPublic: z.boolean(),
    isCustom: z.boolean(),
});

const BooksFromUserShelvesSchema = z.object({
    shelf: ShelfWithoutMetadataSchema,
    books: z.union([z.array(BookSchema), z.literal(false)]),
});

// Are every response returning value like this: data: z.object({data: something}) ?
// => If not, need to make update the relevant codebase part to be more consistent
export const FetchBooksOnUserShelvesResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({
        data: z.array(BooksFromUserShelvesSchema),
    }),
});

export type FetchBooksOnUserShelvesResponseType = z.infer<
    typeof FetchBooksOnUserShelvesResponseSchema
>;

export type FetchBooksOnUserShelvesErrorType = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
