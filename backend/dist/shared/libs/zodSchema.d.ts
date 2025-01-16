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
    country: z.ZodString;
    city: z.ZodString;
    address: z.ZodString;
    postalNumber: z.ZodString;
    rooms: z.ZodNumber;
    description: z.ZodString;
    name: z.ZodString;
    bedRoom: z.ZodNumber;
    wc: z.ZodNumber;
    livingRoom: z.ZodNumber;
    wifi: z.ZodBoolean;
    kitchen: z.ZodBoolean;
    tv: z.ZodBoolean;
    freeParking: z.ZodBoolean;
    airConditioner: z.ZodBoolean;
    garden: z.ZodBoolean;
    pool: z.ZodBoolean;
    washMachine: z.ZodBoolean;
    gym: z.ZodBoolean;
    beachAccess: z.ZodBoolean;
    fireAlarm: z.ZodBoolean;
    firstAid: z.ZodBoolean;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    category?: string;
    country?: string;
    city?: string;
    address?: string;
    postalNumber?: string;
    rooms?: number;
    description?: string;
    name?: string;
    bedRoom?: number;
    wc?: number;
    livingRoom?: number;
    wifi?: boolean;
    kitchen?: boolean;
    tv?: boolean;
    freeParking?: boolean;
    airConditioner?: boolean;
    garden?: boolean;
    pool?: boolean;
    washMachine?: boolean;
    gym?: boolean;
    beachAccess?: boolean;
    fireAlarm?: boolean;
    firstAid?: boolean;
    price?: number;
}, {
    category?: string;
    country?: string;
    city?: string;
    address?: string;
    postalNumber?: string;
    rooms?: number;
    description?: string;
    name?: string;
    bedRoom?: number;
    wc?: number;
    livingRoom?: number;
    wifi?: boolean;
    kitchen?: boolean;
    tv?: boolean;
    freeParking?: boolean;
    airConditioner?: boolean;
    garden?: boolean;
    pool?: boolean;
    washMachine?: boolean;
    gym?: boolean;
    beachAccess?: boolean;
    fireAlarm?: boolean;
    firstAid?: boolean;
    price?: number;
}>;
export type ListingSchemaType = z.infer<typeof listingSchema>;
