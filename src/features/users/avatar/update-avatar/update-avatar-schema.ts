import z from 'zod';

export const UpdateAvatarSchema = z.object({
    avatar_id: z.enum(
        [
            'abstract-red.jpg',
            'abstract-blue-orange.jpg',
            'abstract-blue-waves.jpg',
            'abstract-dark-blue.jpg',
            'abstract-purple-cut.jpg',
            'abstract-white-waves.jpg',
            'abstract-white-cuts.jpg',
            'blue-galaxy.jpg',
            'bright-stars.jpg',
            'deers-and-mountains.jpg',
            'flowers-in-pastures.jpg',
            'mountains-topdown.jpg',
            'purple-cosmos.jpg',
            'red-mushroom.jpg',
            'single-rose-flower.jpg',
            'water-cascading-down.jpg',
            'white-daisy.jpg',
            'wood-and-mist.jpg',
        ],
        {
            message: 'Invalid avatar. Please, select one from the list.',
        }
    ),
});

export type UpdateAvatarType = z.infer<typeof UpdateAvatarSchema>;

export const UpdateAvatarResponseSchema = z.object({
    success: z.boolean(),
    name: z.string(),
    message: z.string(),
    httpCode: z.number(),
    data: z.object({}),
});

export type UpdateAvatarResponseType = z.infer<
    typeof UpdateAvatarResponseSchema
>;

export type UpdateAvatarErrorType = {
    name: string;
    cause: string;
    hint: string;
    stack: string;
};
