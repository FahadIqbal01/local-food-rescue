import { Request, Response } from "express";
import userModels from "../user/user.models";
import {
  DecodeToken,
  GenerateTokenForgotPassword,
} from "../utils/jsonWebToken";
import { SendEmailForResetCredentials } from "../utils/emailHandler";
import { ForgotPassword } from "../templates/forgotPasswordTemplate";
import { GenerateHash } from "../utils/hashing";

export async function CheckUserExist(request: Request, response: Response) {
  try {
    const email: string = request.body.email;

    const user = await userModels.findOne({ email: email });
    if (!user) {
      return response.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    const payload = {
      userEmail: email,
    };
    const forgotPasswordToken = GenerateTokenForgotPassword(payload);

    user.resetCredentialsToken = forgotPasswordToken;
    await user.save();

    // const resetPasswordLink: string = `http://127.0.0.1:3000/login/reset-password?token=${forgotPasswordToken}`;
    const resetPasswordLink: string = `http://127.0.0.1:3000/login/reset-password/${forgotPasswordToken}`;
    await SendEmailForResetCredentials(
      "fahadiqbal9318@gmail.com",
      "Request for password reset.",
      "",
      ForgotPassword(resetPasswordLink),
    );

    return response.status(200).json({
      status: true,
      message: "Check if user exists in database.",
      body: request.body,
      email: user.email,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function VerifyUserForResetCredentials(
  request: Request,
  response: Response,
) {
  try {
    // const resetCredsToken = request.headers.authorization?.split(" ")[1];
    console.log(request.body);
    const resetCredsToken = request.body.token;
    const newPassword = request.body.newPassword;
    console.log(resetCredsToken);
    console.log(newPassword);
    if (!resetCredsToken) {
      return response.status(404).json({
        status: false,
        message: "Token not found.",
      });
    }

    const decodedPayload: any = DecodeToken(resetCredsToken as string);

    const existingUser = await userModels.findOne({
      email: decodedPayload.payload.userEmail,
    });
    if (!existingUser) {
      return response.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    existingUser.resetCredentialsToken = "";
    existingUser.password = await GenerateHash(newPassword);
    await existingUser.save();

    return response.status(200).json({
      status: true,
      user: existingUser,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}
