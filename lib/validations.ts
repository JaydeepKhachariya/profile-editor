import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }).optional(),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, {
    message: "Please enter a valid phone number.",
  }).optional(),
  location: z.string().max(100, {
    message: "Location must not exceed 100 characters.",
  }).optional(),
})

export type ProfileData = z.infer<typeof profileSchema>
