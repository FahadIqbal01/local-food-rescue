import { Router } from "express";
import {
  GetAllDonations,
  GetAllDonors,
  GetAllRecipients,
  GetStats,
  GetDonorByID,
  GetDonationsOfDonor,
  GetRecipientByID,
  GetClaimsOfRecipient,
} from "./admin.controllers";
import { CheckJWT } from "../middlewares/checkJWToken";
import { AuthorizeUser } from "../middlewares/authorizeUser";

const adminRouter: Router = Router();

adminRouter.get(
  "/get/donation",
  CheckJWT,
  AuthorizeUser(["admin"]),
  GetAllDonations,
);

adminRouter.get(
  "/get/donors",
  CheckJWT,
  AuthorizeUser(["admin"]),
  GetAllDonors,
);

adminRouter.get(
  "/donors/:id",
  CheckJWT,
  AuthorizeUser(["admin"]),
  GetDonorByID,
);

adminRouter.get(
  "/donors/:id/donations",
  CheckJWT,
  AuthorizeUser(["admin"]),
  GetDonationsOfDonor,
);

adminRouter.get("/get/stats", CheckJWT, AuthorizeUser(["admin"]), GetStats);

adminRouter.get(
  "/get/recipients",
  CheckJWT,
  AuthorizeUser(["admin"]),
  GetAllRecipients,
);

adminRouter.get("/recipients/:id", GetRecipientByID);
adminRouter.get("/recipients/:id/claims", GetClaimsOfRecipient);

export default adminRouter;
