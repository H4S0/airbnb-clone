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
        maxPerson: z.ZodNumber;
        isPet: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        beds?: number;
        bedRoom?: number;
        livingRoom?: number;
        wc?: number;
        amenities?: [string, ...string[]];
        maxPerson?: number;
        isPet?: boolean;
    }, {
        name?: string;
        description?: string;
        beds?: number;
        bedRoom?: number;
        livingRoom?: number;
        wc?: number;
        amenities?: [string, ...string[]];
        maxPerson?: number;
        isPet?: boolean;
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
        maxPerson?: number;
        isPet?: boolean;
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
        maxPerson?: number;
        isPet?: boolean;
    };
}>;
export type ListingSchemaType = z.infer<typeof listingSchema>;
export declare const applicationSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phoneNumber: z.ZodString;
    dateRange: z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        from?: string;
        to?: string;
    }, {
        from?: string;
        to?: string;
    }>;
    adults: z.ZodNumber;
    kids: z.ZodNumber;
    userId: z.ZodNumber;
    listingId: z.ZodNumber;
    isAccepted: z.ZodBoolean;
    isDeclined: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    email?: string;
    userId?: number;
    fullName?: string;
    phoneNumber?: string;
    dateRange?: {
        from?: string;
        to?: string;
    };
    adults?: number;
    kids?: number;
    listingId?: number;
    isAccepted?: boolean;
    isDeclined?: boolean;
}, {
    email?: string;
    userId?: number;
    fullName?: string;
    phoneNumber?: string;
    dateRange?: {
        from?: string;
        to?: string;
    };
    adults?: number;
    kids?: number;
    listingId?: number;
    isAccepted?: boolean;
    isDeclined?: boolean;
}>;
export type ApplicationSchemaType = z.infer<typeof applicationSchema>;
