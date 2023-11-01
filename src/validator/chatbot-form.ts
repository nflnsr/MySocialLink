import * as z from "zod";

export const formSchema = z.object({
    input: z.string()
});

export type FormValues = z.infer<typeof formSchema>;
