import mongoose from "mongoose";
import DonationType from "./donation.types";

const donationSchema = new mongoose.Schema<DonationType>(
  {
    donorID: { type: String, required: true },
    recipientID: { type: String },
    foodType: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    pickupAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "available", "completed", "expired"],
      default: "available",
    },
    expiryDate: { type: String },
    notes: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<DonationType>("Donation", donationSchema);
