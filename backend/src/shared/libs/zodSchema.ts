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
    maxPerson: z.number(),
    isPet: z.boolean(),
  }),
});

export type ListingSchemaType = z.infer<typeof listingSchema>;

export const applicationSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string(),
  dateRange: z.object({
    from: z.string(),
    to: z.string(),
  }),
  adults: z.number(),
  kids: z.number(),
  userId: z.coerce.number().min(1, 'Must provide userId'),
  listingId: z.coerce.number().min(1, 'Must provide listingId'),
});

export type ApplicationSchemaType = z.infer<typeof applicationSchema>;
