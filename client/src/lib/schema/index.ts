import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type SignInSchemaTS = z.infer<typeof SignInSchema>;

export { SignInSchema };
export type { SignInSchemaTS };
