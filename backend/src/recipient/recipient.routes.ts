import { Router } from "express";
import { ClaimDonation } from "./recipient.controllers";
import { CheckJWT } from "../middlewares/checkJWToken";
import { AuthorizeUser } from "../middlewares/authorizeUser";

const recipientRouter: Router = Router();

recipientRouter.patch(
  "/claim",
  CheckJWT,
  AuthorizeUser(["recipient"]),
  ClaimDonation,
);

export default recipientRouter;
