import { Request, Response } from "express";
import donationModels from "../donation/donation.models";
import { AuthenticatedRequest } from "../@types/authenticatedRequest";

export async function ClaimDonation(
  request: AuthenticatedRequest,
  response: Response,
) {
  try {
    const id = request.query.donationID;
    const recipientID: string | null = request.user.id;
    const donation = await donationModels.findByIdAndUpdate(
      id,
      { status: "completed", recipientID: recipientID },
      { new: true, runValidators: true },
    );
    if (!donation) {
      return response
        .status(404)
        .json({ status: false, message: "Donation not found." });
    }

    return response.status(200).json({
      status: true,
      message: "Donation claimed",
      donationId: request.query.donationID,
      claimedDonation: donation,
      recipientId: recipientID,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}
