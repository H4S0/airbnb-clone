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
  userId: z.coerce.number().min(1, 'Must provide userId'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be a positive number'),
  listingLocation: z.object({
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
    address: z.string().min(1, 'Address is required'),
    postalNumber: z.number(),
  }),
  listingDetails: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    beds: z.number().int().positive(),
    bedRoom: z.number().int().positive(),
    livingRoom: z.number().int(),
    wc: z.number().int(),
    amenities: z.array(z.string()).nonempty(),
  }),
});

export type ListingSchemaType = z.infer<typeof listingSchema>;
