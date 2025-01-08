import { z } from "zod";

// sign in schema for user and captain
const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type SignInSchemaTS = z.infer<typeof SignInSchema>;

// sign up schema for user
const SignUpSchema = z.object({
  fullname: z.object({
    firstname: z.string().min(3).max(20),
    lastname: z.string().min(3).max(20),
  }),
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type SignUpSchemaTS = z.infer<typeof SignUpSchema>;

// sign up schema for captain
const SignUpSchemaCaptain = z.object({
  fullname: z.object({
    firstname: z.string().min(3).max(20),
    lastname: z.string().min(3).max(20),
  }),
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type SignUpSchemaCaptainTS = z.infer<typeof SignUpSchemaCaptain>;

export { SignInSchema, SignUpSchema, SignUpSchemaCaptain };
export type { SignInSchemaTS, SignUpSchemaTS, SignUpSchemaCaptainTS };
