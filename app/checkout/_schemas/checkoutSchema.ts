import { z } from 'zod';

export const shippingSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Full name is too long' }),
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' }),
  phoneNumber: z.string(),
  countryName: z.string().min(1, { message: 'Please select a country' }),
  address: z
    .string()
    .min(5, { message: 'Destination address must be at least 5 characters' })
    .max(200, { message: 'Address is too long' }),
  city: z
    .string()
    .min(2, { message: 'City must be at least 2 characters' })
    .max(100, { message: 'City is too long' }),
  stateName: z.string(),
  postalCode: z
    .string()
    .min(3, { message: 'Postal code must be at least 3 characters' })
    .max(20, { message: 'Postal code is too long' }),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
