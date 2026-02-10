import { Router } from "express";
import {
  CheckUserExist,
  VerifyUserForResetCredentials,
} from "./forgotPassword.controllers";

const forgotPasswordRouter: Router = Router();

forgotPasswordRouter.post("/verifyUser", CheckUserExist);
forgotPasswordRouter.patch("/reset", VerifyUserForResetCredentials);

export default forgotPasswordRouter;
