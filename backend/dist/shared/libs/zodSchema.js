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
    location: zod_1.z.string().min(1, 'Location is required'),
    rooms: zod_1.z.number().int().positive('Rooms must be a positive integer'),
    description: zod_1.z.string().min(1, 'Description is required'),
    price: zod_1.z.number().positive('Price must be a positive number'),
});
//# sourceMappingURL=zodSchema.js.map