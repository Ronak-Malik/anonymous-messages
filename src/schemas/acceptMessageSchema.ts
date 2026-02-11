import { z } from "zod/mini";

export const AcceptMessageSchema = z.object({
    acceptMessages : z.boolean(),
});