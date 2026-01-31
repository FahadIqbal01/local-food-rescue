import { Response, NextFunction, response } from "express";
import { DecodeToken } from "../utils/jsonWebToken";
import { AuthenticatedRequest } from "../@types/authenticatedRequest";

export function CheckJWT(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    const accessToken: string | undefined =
      request.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return response.status(400).json({
        status: false,
        message: "Token not found.",
      });
    }

    const decodedPayload = DecodeToken(accessToken);
    request.user = decodedPayload.payload;

    next();
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }
}
