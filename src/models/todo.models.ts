import { z } from "zod";

export const TodoStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const ToodSchema = z.object({
  message: z.string().min(1, "Message is required"),
  status: TodoStatusEnum,
});

export type TodoInput = z.infer<typeof ToodSchema>;
