import { z } from 'zod';
export declare const registerSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
    confirmPassword?: string;
}, {
    email?: string;
    password?: string;
    confirmPassword?: string;
}>, {
    email?: string;
    password?: string;
    confirmPassword?: string;
}, {
    email?: string;
    password?: string;
    confirmPassword?: string;
}>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export declare const listingSchema: z.ZodObject<{
    category: z.ZodString;
    location: z.ZodString;
    rooms: z.ZodNumber;
    description: z.ZodString;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    category?: string;
    location?: string;
    rooms?: number;
    description?: string;
    price?: number;
}, {
    category?: string;
    location?: string;
    rooms?: number;
    description?: string;
    price?: number;
}>;
export type ListingSchemaType = z.infer<typeof listingSchema>;
