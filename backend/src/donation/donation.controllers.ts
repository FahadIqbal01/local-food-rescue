import { Response } from "express";
import { AuthenticatedRequest } from "../@types/authenticatedRequest";
import donationModels from "./donation.models";
import donationSchemaValidator from "./donation.validators";

export async function CreateDonation(
  request: AuthenticatedRequest,
  response: Response,
) {
  try {
    const { data, success, error } = donationSchemaValidator.safeParse({
      ...request.body,
      donorID: request.user.id,
    });
    if (!success) {
      return response.status(400).json({
        status: false,
        message: error.issues.map((issue) => issue.path + issue.message),
      });
    }

    const newDonation = await donationModels.create(data);

    return response.status(200).json({
      status: true,
      message: "Create donation",
      donation: newDonation,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}
export async function GetDonations(
  request: AuthenticatedRequest,
  response: Response,
) {
  try {
    const page: number = parseInt(request.query.page as string);
    const limit: number = parseInt(request.query.limit as string);

    const skip: number = (page - 1) * limit;

    const donations = await donationModels
      .find({
        donorID: request.query.donorID,
        // status: "available",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return response.status(200).json({
      status: true,
      donations: donations,
      stats: {
        total: await donationModels.countDocuments({
          donorID: request.query.donorID,
          // status: "available",
        }),
        completed: await donationModels.countDocuments({
          donorID: request.query.donorID,
          status: "completed",
        }),
        available: await donationModels.countDocuments({
          donorID: request.query.donorID,
          status: "available",
        }),
        expired: await donationModels.countDocuments({
          donorID: request.query.donorID,
          status: "expired",
        }),
      },
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetDonationsForRecipients(
  request: AuthenticatedRequest,
  response: Response,
) {
  try {
    const page: number = parseInt(request.query.page as string);
    const limit: number = parseInt(request.query.limit as string);

    const skip: number = (page - 1) * limit;

    const donations = await donationModels
      .find({
        status: "available",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return response.status(200).json({
      status: true,
      donations: donations,
      total: await donationModels.countDocuments({
        status: "available",
      }),
      claimed: await donationModels.countDocuments({
        status: "completed",
      }),
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetClaimedDonations(
  request: AuthenticatedRequest,
  response: Response,
) {
  try {
    const claims = await donationModels.find({
      recipientID: request.query.userID,
      status: "completed",
    });

    return response.status(200).json({
      status: true,
      claimedDonations: claims,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetDonationById(
  request: AuthenticatedRequest,
  response: Response,
) {
  try {
    const page: number = parseInt(request.query.page as string);
    const limit: number = parseInt(request.query.limit as string);
    const skip: number = (page - 1) * limit;
    const donations = await donationModels
      .find({ donorID: request.query.donorID })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return response.status(200).json({
      status: true,
      donorID: request.query.donorID,
      donations: donations,
      total: await donationModels.countDocuments({
        donorID: request.params.id,
      }),
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}
export async function UpdateDonation(
  request: AuthenticatedRequest,
  response: Response,
) {
  try {
    const { data, success, error } = donationSchemaValidator.safeParse(
      request.body,
    );
    if (!success) {
      return response.status(400).json({
        status: false,
        message: error.issues.map(
          (issue) => `${issue.code}-${issue.path} ${issue.message}`,
        ),
      });
    }

    const donationId: string | string[] = request.params.id;
    const donation = await donationModels.findByIdAndUpdate(
      donationId,
      { $set: data },
      { new: true, runValidators: true },
    );

    return response.status(200).json({
      status: true,
      donation: donation,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}
export async function DeleteDonation(
  request: AuthenticatedRequest,
  response: Response,
) {
  try {
    const donationId: string | string[] = request.params.id;

    const donation = await donationModels.findByIdAndDelete(donationId, {
      new: true,
      runValidators: true,
    });

    return response.status(201).json({
      status: true,
      message: "User deleted successfully.",
      donation: donation,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetPastHistory(
  request: AuthenticatedRequest,
  response: Response,
) {
  try {
    const page: number = parseInt(request.query.page as string);
    const limit: number = parseInt(request.query.limit as string);
    const skip: number = (page - 1) * limit;

    const donations = await donationModels
      .find({
        donorID: request.query.donorID,
        status: { $ne: "available" },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return response.status(200).json({
      status: true,
      filterQuery: request.query,
      donations: donations,
      total: await donationModels.countDocuments({
        donorID: request.query.donorID,
        status: { $ne: "available" },
      }),
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}
