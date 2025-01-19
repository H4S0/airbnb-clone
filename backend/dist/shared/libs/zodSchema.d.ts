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
    userId: z.ZodNumber;
    category: z.ZodString;
    price: z.ZodNumber;
    listingLocation: z.ZodObject<{
        country: z.ZodString;
        city: z.ZodString;
        address: z.ZodString;
        postalNumber: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        country?: string;
        city?: string;
        address?: string;
        postalNumber?: number;
    }, {
        country?: string;
        city?: string;
        address?: string;
        postalNumber?: number;
    }>;
    listingDetails: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        beds: z.ZodNumber;
        bedRoom: z.ZodNumber;
        livingRoom: z.ZodNumber;
        wc: z.ZodNumber;
        amenities: z.ZodArray<z.ZodString, "atleastone">;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        beds?: number;
        bedRoom?: number;
        livingRoom?: number;
        wc?: number;
        amenities?: [string, ...string[]];
    }, {
        name?: string;
        description?: string;
        beds?: number;
        bedRoom?: number;
        livingRoom?: number;
        wc?: number;
        amenities?: [string, ...string[]];
    }>;
}, "strip", z.ZodTypeAny, {
    userId?: number;
    category?: string;
    price?: number;
    listingLocation?: {
        country?: string;
        city?: string;
        address?: string;
        postalNumber?: number;
    };
    listingDetails?: {
        name?: string;
        description?: string;
        beds?: number;
        bedRoom?: number;
        livingRoom?: number;
        wc?: number;
        amenities?: [string, ...string[]];
    };
}, {
    userId?: number;
    category?: string;
    price?: number;
    listingLocation?: {
        country?: string;
        city?: string;
        address?: string;
        postalNumber?: number;
    };
    listingDetails?: {
        name?: string;
        description?: string;
        beds?: number;
        bedRoom?: number;
        livingRoom?: number;
        wc?: number;
        amenities?: [string, ...string[]];
    };
}>;
export type ListingSchemaType = z.infer<typeof listingSchema>;
