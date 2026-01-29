import mongoose from "mongoose";

import { UserType } from "./user.types";

const userSchema = new mongoose.Schema<UserType>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format. Please enter a valid email address (e.g. user@example.com).",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
      ],
      min: 8,
    },
    role: {
      type: String,
      enum: ["donor", "recipient", "admin"],
      required: true,
    }, // "donor"|"recipient"|"admin"
    phoneNumber: { type: String, length: 11 },
    address: [{ type: String, required: true }],
    status: { type: String, enum: ["active", "inactive", "banned"] }, // "active"|"inactive"|"banned"
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<UserType>("User", userSchema);
