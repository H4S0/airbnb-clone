"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationSchema = exports.listingSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    confirmPassword: zod_1.z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.listingSchema = zod_1.z.object({
    userId: zod_1.z.coerce.number().min(1, 'Must provide userId'),
    category: zod_1.z.string().min(1, 'Category is required'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    listingLocation: zod_1.z.object({
        country: zod_1.z.string().min(1, 'Country is required'),
        city: zod_1.z.string().min(1, 'City is required'),
        address: zod_1.z.string().min(1, 'Address is required'),
        postalNumber: zod_1.z.number(),
    }),
    listingDetails: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        beds: zod_1.z.number().int().positive(),
        bedRoom: zod_1.z.number().int().positive(),
        livingRoom: zod_1.z.number().int(),
        wc: zod_1.z.number().int(),
        amenities: zod_1.z.array(zod_1.z.string()).nonempty(),
        maxPerson: zod_1.z.number(),
        isPet: zod_1.z.boolean(),
    }),
});
exports.applicationSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    phoneNumber: zod_1.z.string(),
    dateRange: zod_1.z.string(),
    adults: zod_1.z.number(),
    kids: zod_1.z.number(),
    userId: zod_1.z.coerce.number().min(1, 'Must provide userId'),
    listingId: zod_1.z.coerce.number().min(1, 'Must provide listingId'),
});
//# sourceMappingURL=zodSchema.js.map