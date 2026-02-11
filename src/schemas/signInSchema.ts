import { z } from "zod/mini";

export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string(),
})