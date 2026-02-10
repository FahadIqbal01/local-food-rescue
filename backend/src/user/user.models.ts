import mongoose from "mongoose";

import { UserType } from "./user.types";

const userSchema = new mongoose.Schema<UserType>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    role: {
      type: String,
      enum: ["donor", "recipient", "admin"],
      required: true,
    }, // "donor"|"recipient"|"admin"
    phoneNumber: { type: String, length: 11 },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "inactive",
    }, // "active"|"inactive"|"banned"
    isDeleted: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    resetCredentialsToken: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<UserType>("User", userSchema);
