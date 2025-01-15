import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const listingSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(2, 'Address is required'),
  postalNumber: z.string(),
  rooms: z.number().int().positive('Rooms must be a positive integer'),
  description: z.string().min(1, 'Description is required'),
  name: z.string().min(3, 'Name is required'),
  bedRoom: z.number(),
  wc: z.number(),
  livingRoom: z.number(),
  price: z.number().positive('Price must be a positive number'),
});

export type ListingSchemaType = z.infer<typeof listingSchema>;
