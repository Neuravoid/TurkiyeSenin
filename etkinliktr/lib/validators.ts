import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  municipalityId: z.string().cuid('Invalid municipality ID.'),
  categoryId: z.string().cuid('Invalid category ID.'),
  startDatetime: z.coerce.date({ invalid_type_error: 'Invalid start date.' }),
  endDatetime: z.coerce.date({ invalid_type_error: 'Invalid end date.' }),
  venueName: z.string().min(2, 'Venue name is required.'),
  venueAddress: z.string().optional(),
  city: z.string().min(2).optional(),
  district: z.string().min(2).optional(),
  capacity: z.coerce.number().int().positive('Capacity must be a positive number.'),
  price: z.coerce.number().min(0, 'Price cannot be negative.').default(0),
  isFree: z.boolean().default(true),
  registrationRequired: z.boolean().default(true),
});

// User validation schema for admin operations
export const userSchema = z.object({
  email: z.string().email('Invalid email address.'),
  firstName: z.string().min(2, 'First name must be at least 2 characters long.'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters long.'),
  role: z.enum(['USER', 'ADMIN'], { invalid_type_error: 'Role must be either USER or ADMIN.' }),
  city: z.string().optional(),
  district: z.string().optional(),
});

// Category validation schema
export const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters long.'),
  slug: z.string().min(2, 'Category slug must be at least 2 characters long.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
});

// Municipality validation schema
export const municipalitySchema = z.object({
  name: z.string().min(2, 'Municipality name must be at least 2 characters long.'),
  city: z.string().min(2, 'City name must be at least 2 characters long.'),
  district: z.string().optional(),
});

// Scholarship validation schemas
export const scholarshipSchema = z.object({
  municipalityId: z.string().cuid('Invalid municipality ID.'),
  title: z.string().min(3),
  description: z.string().optional(),
  eligibilityCriteria: z.string().optional(),
  applicationStart: z.coerce.date().optional(),
  applicationEnd: z.coerce.date().optional(),
  quota: z.coerce.number().int().positive().optional(),
  link: z.string().url().optional(),
  educationLevel: z.string().optional(),
  status: z.string().optional(),
  eventId: z.string().cuid().optional(),
});

export const scholarshipQuerySchema = z.object({
  city: z.string().optional(),
  educationLevel: z.string().optional(),
  activeOnly: z.coerce.boolean().optional(),
  q: z.string().optional(),
  on: z.coerce.date().optional(),
});