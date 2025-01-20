import { z } from "zod";

// sign in schema for user and captain
const SignInSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters long")
    .email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type SignInSchemaTS = z.infer<typeof SignInSchema>;

// sign up schema for user
const SignUpSchema = z.object({
  fullname: z.object({
    firstname: z
      .string()
      .min(3, "First name must be at least 3 characters long")
      .nonempty("First name is required"),
    lastname: z
      .string()
      .min(3, "Last name must be at least 3 characters long")
      .optional(),
  }),
  email: z
    .string()
    .min(5, "Email must be at least 5 characters long")
    .email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
});

type SignUpSchemaTS = z.infer<typeof SignUpSchema>;

// sign up schema for captain
const SignUpSchemaCaptain = z.object({
  fullname: z.object({
    firstname: z
      .string()
      .min(3, "First name must be at least 3 characters long")
      .nonempty("First name is required"),
    lastname: z
      .string()
      .min(3, "Last name must be at least 3 characters long")
      .optional(),
  }),
  email: z
    .string()
    .min(5, "Email must be at least 5 characters long")
    .email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
  soketId: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("inactive"),
  vehicle: z.object({
    color: z
      .string()
      .min(3, "Color must be at least 3 characters long")
      .nonempty("Color is required"),
    plate: z
      .string()
      .min(5, "Plate must be at least 5 characters long")
      .nonempty("Plate is required"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    vehicleType: z.enum(["motorcycle", "car", "auto"]),
  }),
  location: z
    .object({
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .optional(),
});

type SignUpSchemaCaptainTS = z.infer<typeof SignUpSchemaCaptain>;

// pickup-trip schema
const PickUpSchema = z.object({
  pickUpLocation: z.string(),
  dropDestination: z.string(),
});

type PickUpSchemaTS = z.infer<typeof PickUpSchema>;

// otp schema
const OTPSchema = z.object({
  OTP: z.number(),
});

type OTPSchemaTS = z.infer<typeof OTPSchema>;

export {
  SignInSchema,
  SignUpSchema,
  SignUpSchemaCaptain,
  PickUpSchema,
  OTPSchema,
};
export type {
  SignInSchemaTS,
  SignUpSchemaTS,
  SignUpSchemaCaptainTS,
  PickUpSchemaTS,
  OTPSchemaTS,
};
