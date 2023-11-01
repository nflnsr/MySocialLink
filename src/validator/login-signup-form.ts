import * as z from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .refine((val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(val), {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter and one number.",
    }),
});

export type FormValues = z.infer<typeof formSchema>;
