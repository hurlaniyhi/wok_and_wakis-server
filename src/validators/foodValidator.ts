import { z } from 'zod';
import { allowedCategories, allowedSearchParams } from '../utils/constants'
import helpers from '../utils/helpers';

// ID Param Schema
export const idParamSchema = z.object({
    id: z.string().transform(Number).refine((val: number) => !isNaN(val) && val > 0, {
        message: 'ID must be a positive number',
    })
});

export const baseFoodSchema = z.object({
    title: z
        .string()
        .min(2)
        .transform((val: string) => val.trim()),
    description: z
        .string()
        .transform((val: string) => val.trim())
        .optional(),
    category: z
        .string()
        .transform((val: string) => val.trim().toLowerCase())
        .transform((val: string) => helpers.normalizeCategory(val))
        .refine((val: string) => allowedCategories.includes(val), {
            message: `Category must be one of: ${allowedCategories.join(', ')}`
        }),
    price: z.number().positive(),
    isPopular: z
        .boolean()
        .transform((val: any) => val ? 1 : 0)
        .optional(),
    imageUrl: z.string().url()
});

// For POST (Create)
export const foodSchema = baseFoodSchema.extend({
    isPopular: z
        .boolean()
        .transform((val) => (val ? 1 : 0))
        .optional()
        .default(0)
});

// For POST (Bulk Create)
export const bulkFoodSchema = z.array(foodSchema);

// For PUT (Update)
export const updateFoodSchema = baseFoodSchema.partial();

// For Search
export const searchSchema = z.object({
    searchParam: z
        .string()
        .refine((val: string) => allowedSearchParams.includes(val), {
            message: `Param must be one of: ${allowedSearchParams.join(', ')}`
        }),
    searchValue: z
        .string()
        .transform((val: string) => helpers.normalizeSearchValue(val))
});