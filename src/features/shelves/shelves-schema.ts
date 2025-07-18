// Add a "s" to every file named "schema" => "schemas"
import { z } from 'zod';

// Use zod shape to automatically update (and omit) the Sub-Schema everywhere

export const ShelveSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    name: z.string().min(1).max(100),
    isPublic: z.boolean(),
    isCustom: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type ShelveType = z.infer<typeof ShelveSchema>;
