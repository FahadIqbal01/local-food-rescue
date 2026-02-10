import { Request, Response } from "express";
import donationModels from "../donation/donation.models";
import userModels from "../user/user.models";

export async function GetAllDonations(request: Request, response: Response) {
  try {
    const limit: number = parseInt(request.query.limit as string);
    const page: number = parseInt(request.query.page as string);

    const skip: number = (page - 1) * limit;

    const donations = await donationModels
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return response.status(200).json({
      status: true,
      allDonations: donations,
      total: await donationModels.countDocuments(),
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetAllDonors(request: Request, response: Response) {
  try {
    const page: number = parseInt(request.query.page as string);
    const limit: number = parseInt(request.query.limit as string);
    const skip: number = (page - 1) * limit;

    const donors = await userModels
      .find({ role: "donor" })
      .skip(skip)
      .limit(limit);

    return response.status(200).json({
      status: true,
      allDonors: donors,
      total: await userModels.countDocuments({ role: "donor" }),
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetStats(request: Request, response: Response) {
  try {
    return response.status(200).json({
      status: true,
      totalDonors: await userModels.countDocuments({ role: "donor" }),
      totalRecipients: await userModels.countDocuments({ role: "recipient" }),
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetAllRecipients(request: Request, response: Response) {
  try {
    const page: number = parseInt(request.query.page as string);
    const limit: number = parseInt(request.query.limit as string);
    const skip: number = (page - 1) * limit;

    console.log(`page: ${page}, limit: ${limit} and skip: ${skip}`);

    const recipients = await userModels
      .find({ role: "recipient" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return response.status(200).json({
      status: true,
      allRecipients: recipients,
      total: await userModels.countDocuments({ role: "recipient" }),
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetDonorByID(request: Request, response: Response) {
  const donor = await userModels.findById({ _id: request.params.id });
  try {
    return response.status(200).json({
      status: true,
      message: request.params.id,
      donor: donor,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetDonationsOfDonor(
  request: Request,
  response: Response,
) {
  try {
    const page: number = parseInt(request.query.page as string);
    const limit: number = parseInt(request.query.limit as string);
    const skip: number = (page - 1) * limit;

    const donations = await donationModels
      .find({ donorID: request.params.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return response.status(200).json({
      status: true,
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

export async function GetRecipientByID(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const recipient = await userModels.findById(id);
    if (!recipient) {
      return response.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    return response.status(200).json({
      status: true,
      recipient: recipient,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function GetClaimsOfRecipient(
  request: Request,
  response: Response,
) {
  try {
    const page: number = parseInt(request.query.page as string);
    const limit: number = parseInt(request.query.limit as string);
    const skip: number = (page - 1) * limit;

    const id = request.params.id;
    const claims = await donationModels
      .find({ recipientID: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return response.status(200).json({
      status: true,
      claims: claims,
      stats: {
        total: await donationModels.countDocuments({ recipientID: id }),
      },
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}
