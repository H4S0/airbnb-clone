"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listingSchema = exports.loginSchema = exports.registerSchema = void 0;
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
    category: zod_1.z.string().min(1, 'Category is required'),
    country: zod_1.z.string().min(1, 'Country is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    address: zod_1.z.string().min(2, 'Address is required'),
    postalNumber: zod_1.z.string(),
    rooms: zod_1.z.number().int().positive('Rooms must be a positive integer'),
    description: zod_1.z.string().min(1, 'Description is required'),
    name: zod_1.z.string().min(3, 'Name is required'),
    bedRoom: zod_1.z.number(),
    wc: zod_1.z.number(),
    livingRoom: zod_1.z.number(),
    wifi: zod_1.z.boolean(),
    kitchen: zod_1.z.boolean(),
    tv: zod_1.z.boolean(),
    freeParking: zod_1.z.boolean(),
    airConditioner: zod_1.z.boolean(),
    garden: zod_1.z.boolean(),
    pool: zod_1.z.boolean(),
    washMachine: zod_1.z.boolean(),
    gym: zod_1.z.boolean(),
    beachAccess: zod_1.z.boolean(),
    fireAlarm: zod_1.z.boolean(),
    firstAid: zod_1.z.boolean(),
    price: zod_1.z.number().positive('Price must be a positive number'),
});
//# sourceMappingURL=zodSchema.js.map