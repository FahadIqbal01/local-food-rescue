import { Document } from "mongoose";

interface DonationType extends Document {
  donorID: string;
  recipientID: string | null;
  foodType: string;
  quantity: Number;
  pickupAddress: string;
  status: string;
  expiryDate: string;
  notes: string;
}

export default DonationType;
