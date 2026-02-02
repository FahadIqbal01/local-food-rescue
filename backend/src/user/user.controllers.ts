import { Request, Response } from "express";
import userModels from "./user.models";
import {
  userSchemaValidator,
  userSchemaUpdateValidator,
  userLoginValidator,
} from "./user.validators";
import { CompareHash, GenerateHash } from "../utils/hashing";
import { SendVerificationEmail } from "../utils/emailHandler";
import { VerificationEmail } from "../templates/emailVerificationTemplate";
import { DecodeToken, GenerateToken } from "../utils/jsonWebToken";

export async function CreateUser(request: Request, response: Response) {
  try {
    const { data, success, error } = userSchemaValidator.safeParse(
      request.body,
    );
    if (!success) {
      return response.status(400).json({
        status: false,
        message: "In zod validation",
        errorMessage: error.issues.map((issue) => issue.message),
      });
    }

    const existingUser = await userModels.findOne({ email: data.email });
    if (existingUser) {
      return response.status(400).json({
        status: false,
        message: "User already exists.",
        data: existingUser,
      });
    }

    const hashedPassword = await GenerateHash(data.password);
    data.password = hashedPassword;

    const newUser = await userModels.create(data);

    const payload = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    const verificationToken: string = GenerateToken(payload);
    const verificationLink: string = `http://localhost:3000/verify?token=${verificationToken}`;

    await SendVerificationEmail(
      "fahadiqbal9318@gmail.com",
      "Welcome to Food Rescue!",
      "Your account has been created successfully.",
      VerificationEmail(newUser.name, newUser.role, verificationLink),
    );

    return response.status(200).json({
      status: true,
      message: "User created.",
      data: newUser,
      token: verificationToken,
    });
  } catch (err) {
    return response.status(400).json({
      status: false,
      message: err,
    });
  }
}

export async function GetAllUsers(request: Request, response: Response) {
  try {
    const allUsers = await userModels.find();
    return response.status(200).json({
      status: true,
      message: allUsers.length == 0 ? "No users available." : "Get all users.",
      data: allUsers,
    });
  } catch (error) {
    return response.status(404).json({
      status: false,
      message: error,
    });
  }
}

export async function GetUserById(request: Request, response: Response) {
  try {
    const userId: string | string[] = request.params.id;
    if (!userId) {
      return response.status(400).json({
        status: false,
        message: "User ID is invalid.",
      });
    }

    const user = await userModels.findById({ _id: userId });
    return response.status(200).json({
      status: true,
      messaeg: "Retrieve user successfully.",
      data: user,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function UpdateUser(request: Request, response: Response) {
  try {
    const userId: string | string[] = request.params.id;
    if (!userId) {
      return response.status(400).json({
        status: false,
        message: "User ID is invalid.",
      });
    }

    const user = await userModels.findById({ _id: userId });
    if (!user) {
      return response.status(200).json({
        status: false,
        message: "User not found.",
      });
    }

    const { data, success, error } = userSchemaUpdateValidator.safeParse(
      request.body,
    );
    if (!success) {
      return response.status(400).json({
        status: false,
        message: "Zod validation failed.",
        errorMessage: error.issues.map((issue) => issue.message),
      });
    }

    const updatedUser = await userModels.findOneAndUpdate(
      { _id: request.params.id },
      { $set: data },
      { new: true, runValidators: true },
    );

    return response.status(200).json({
      status: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function DeleteUser(request: Request, response: Response) {
  try {
    const userId: string | string[] = request.params.id;
    if (!userId) {
      return response.status(400).json({
        status: false,
        message: "User ID is invalid.",
      });
    }

    const user = await userModels.findById({ _id: userId });

    const deleteStatus: boolean | undefined = user?.isDeleted;
    if (!deleteStatus) {
      const softDeletedUser = await user?.updateOne(
        { isDeleted: true },
        { new: true, runValidators: true },
      );
      return response.status(200).json({
        status: false,
        message: "User deleted successfully.",
        data: softDeletedUser,
      });
    } else {
      await userModels.findByIdAndDelete({ _id: userId });
      return response.status(200).json({
        status: true,
        message: "User deleted permanently.",
      });
    }
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function VerifyUser(request: Request, response: Response) {
  try {
    const verificationToken: string | undefined =
      request.headers.authorization?.split(" ")[1];
    if (!verificationToken)
      return response.status(200).json({
        status: true,
        message: "Token not found.",
      });

    const decodedPayload: any = DecodeToken(verificationToken);

    const existingUser = await userModels.findOne({
      email: decodedPayload.payload?.email,
    });
    if (!existingUser) {
      return response.status(400).json({
        status: true,
        message: "User not found.",
      });
    }

    if (existingUser.status === "active") {
      return response.status(200).json({
        status: true,
        message: "User already verified.",
      });
    }

    existingUser.status = "active";
    existingUser.verificationToken = "";

    await existingUser.save();

    return response.status(200).json({
      status: true,
      token: verificationToken,
      decode: DecodeToken(verificationToken).payload,
      verified: existingUser.status,
    });
  } catch (error) {
    return response.status(400).json({
      status: "false",
      message: error,
    });
  }
}

export async function LoginUser(request: Request, response: Response) {
  try {
    const { data, success, error } = userLoginValidator.safeParse(request.body);
    if (!success) {
      return response.status(400).json({
        status: false,
        message: error.issues.map((issue) => issue.message),
      });
    }

    const existingUser = await userModels.findOne({ email: data.email });
    if (!existingUser) {
      return response.status(400).json({
        status: false,
        message: "User not found.",
      });
    }

    const isSuccessfulLogin: boolean = await CompareHash(
      data.password,
      existingUser.password,
    );
    if (!isSuccessfulLogin) {
      return response.status(400).json({
        status: false,
        message: "Invalid Credentials.",
      });
    }

    const payload = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    const accessToken: string = GenerateToken(payload);

    return response.status(200).json({
      status: true,
      message: "User logged in successfully.",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      token: accessToken,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}
