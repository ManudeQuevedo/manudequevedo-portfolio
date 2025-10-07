import { z } from "zod";

export const ContactSchema = z.object({
  purpose: z.enum(["project", "nonprofit", "collab", "other"]),
  summary: z.enum(["branding", "website", "audit", "advice"]),
  fullName: z.string().min(2, "Too short"),
  email: z.email("Invalid email"),
  org: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^[\d+()\-.\s]{6,}$/.test(v), "Invalid phone"),
  message: z.string().min(10, "Tell me a little more"),
  // captcha
  captcha: z.string().min(1, "Captcha required"),
});

export type ContactInput = z.infer<typeof ContactSchema>;