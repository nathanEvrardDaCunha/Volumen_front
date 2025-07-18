import z from 'zod';

export const FetchShelvesSchema = z.object({
    name: z.string().min(1).max(100),
    isPublic: z.boolean(),
    isCustom: z.boolean(),
});

// Are every response returning value like this: data: z.object({data: something}) ?
// => If not, need to make update the relevant codebase part to be more consistent
export const FetchShelvesResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({
        data: z.array(FetchShelvesSchema),
    }),
});

export type FetchShelvesResponseType = z.infer<
    typeof FetchShelvesResponseSchema
>;

export type FetchShelveErrorType = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
