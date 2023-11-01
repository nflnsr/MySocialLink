import * as z from "zod";

export const formSchema = z.object({
  full_name: z.string().max(20, { message: "max character is 20" }).nullable(),
  username: z.string().max(12, { message: "max character is 12" }).nullable(),
  greeting: z.string().max(35, { message: "max character is 35" }).nullable(),
  about: z.string().max(400, { message: "max character is 400" }).nullable(),
  whatsapp: z.string().nullable(),
  instagram: z.string().nullable(),
  linkedin: z.string().nullable(),
  github: z.string().nullable(),
  gmail: z.string().nullable(),
  avatar_url: z.string().nullable(),
});

export type FormValues = z.infer<typeof formSchema>;
