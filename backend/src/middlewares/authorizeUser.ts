import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../@types/authenticatedRequest";

export function AuthorizeUser(roles: string[]) {
  return (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction,
  ) => {
    if (!request.user) {
      return response.status(401).json({
        status: false,
        message: "Unauthorized User.",
      });
    }

    // console.log("Roles: ", roles);
    // console.log("Role: ", request.user.role);
    if (!roles.includes(request.user.role)) {
      return response.status(403).json({
        status: false,
        message: "Access denied for " + request.user.role,
      });
    }

    next();
  };
}
