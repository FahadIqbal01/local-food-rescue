import zod from "zod";

export const userSchemaValidator = zod.object({
  name: zod.string().nonempty(),
  email: zod
    .email({
      pattern: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
      error:
        "Invalid email format. Please enter a valid email address (e.g. user@example.com).",
    })
    .nonempty(),
  password: zod
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
    )
    .nonempty(),
  role: zod.enum(["donor", "recipient", "admin"]),
  phoneNumber: zod.string().nonempty().length(11),
  address: zod.array(zod.string()),
  status: zod.enum(["active", "inactive", "banned"]),
  isDeleted: zod.boolean().default(false),
  verificationToken: zod.string().default(""),
});

export const userSchemaUpdateValidator = userSchemaValidator.partial();

export const userLoginValidator = zod.object({
  email: zod
    .email({
      pattern: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
      error:
        "Invalid email format. Please enter a valid email address (e.g. user@example.com).",
    })
    .nonempty(),
  password: zod
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
    )
    .nonempty(),
});
