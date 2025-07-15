import z from 'zod';

// GOOGLE API SCHEMA

const IndustryIdentifierSchema = z.object({
    type: z.string(),
    identifier: z.string(),
});

const DimensionsSchema = z.object({
    height: z.string().optional(),
    width: z.string().optional(),
    thickness: z.string().optional(),
});

const PriceSchema = z.object({
    amount: z.number(),
    currencyCode: z.string(),
});

const VolumeInfoSchema = z.object({
    title: z.string().optional(),
    authors: z.array(z.string()).optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    publisher: z.string().optional(),
    publishedDate: z.string().optional(),
    industryIdentifiers: z.array(IndustryIdentifierSchema).optional(),
    pageCount: z.number().optional(),
    dimensions: DimensionsSchema.optional(),
    maturityRating: z.string().optional(),
    language: z.string().optional(),
    previewLink: z.string().optional(),
    infoLink: z.string().optional(),
    canonicalVolumeLink: z.string().optional(),
    categories: z.array(z.string()).optional(),
});

const SaleInfoSchema = z.object({
    country: z.string().optional(),
    saleability: z.string().optional(),
    isEbook: z.boolean().optional(),
    listPrice: PriceSchema.optional(),
    retailPrice: PriceSchema.optional(),
    buyLink: z.string().optional(),
});

export const BookSchema = z.object({
    id: z.string(),
    selfLink: z.string(),
    volumeInfo: VolumeInfoSchema,
    saleInfo: SaleInfoSchema,
});

// CUSTOM SCHEMA

// Add Type Suffix for every type schema to enhance formatting ?
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

export type FetchBookResponse = z.infer<typeof FetchBookResponseSchema>;

export type FetchBookError = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
