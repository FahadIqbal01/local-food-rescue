import { Document } from "mongoose";

export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  address: string[];
  status: string;
  isDeleted: boolean;
  verificationToken?: string;
}
