import zod, { ZodObject } from "zod";

const donationSchemaValidator = zod.object({
  donorID: zod.string(),
  recipientID: zod.string().optional(),
  foodType: zod.string(),
  quantity: zod.number().default(0),
  pickupAddress: zod.string(),
  status: zod
    .enum(["pending", "available", "completed", "expired"])
    .default("available"),
  expiryDate: zod.string().optional(),
  notes: zod.string(),
});

export default donationSchemaValidator;
