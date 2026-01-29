import { Request, Response } from "express";
import userModels from "./user.models";
import {
  userSchemaValidator,
  userSchemaUpdateValidator,
} from "./user.validators";

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

    await userModels.create(data!);

    return response.status(200).json({
      status: true,
      message: "User created.",
      data: data,
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
