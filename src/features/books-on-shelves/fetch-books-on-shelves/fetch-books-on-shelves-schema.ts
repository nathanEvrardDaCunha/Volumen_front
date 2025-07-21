import z from 'zod';
import { BookSchema } from '../../books/book-schema';

// export const FetchBooksOnUserShelvesSchema = z.object({
//     name: z.string().min(1).max(100),
//     isPublic: z.boolean(),
//     isCustom: z.boolean(),
// });

// type ShelfWithoutMetadata = Omit<
//     ShelveSchema,
//     'id' | 'userId' | 'createdAt' | 'updatedAt'
// >; // Replace 'any' with your actual shelf type

const ShelfWithoutMetadataSchema = z.object({
    name: z.string(),
    isPublic: z.boolean(),
    isCustom: z.boolean(),
});

const BooksFromUserShelvesSchema = z.object({
    shelf: ShelfWithoutMetadataSchema,
    books: z.union([z.array(BookSchema), z.literal(false)]),
});

// export type BooksFromUserShelvesType = {
//     shelf: ShelfWithoutMetadata;
//     books: BookType[] | false; // getBooksFromShelf can return false or Book[]
// };

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

//

export type FetchBooksOnUserShelvesErrorType = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};

// //

// type ShelfWithoutMetadata = Omit<
//     ShelveType,
//     'id' | 'userId' | 'createdAt' | 'updatedAt'
// >; // Replace 'any' with your actual shelf type

// export type BooksFromUserShelvesType = {
//     shelf: ShelfWithoutMetadata;
//     books: BookType[] | false; // getBooksFromShelf can return false or Book[]
// };
