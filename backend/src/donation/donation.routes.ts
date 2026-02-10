import { Router } from "express";
import {
  CreateDonation,
  GetDonations,
  GetDonationById,
  UpdateDonation,
  DeleteDonation,
  GetPastHistory,
  GetDonationsForRecipients,
  GetClaimedDonations,
} from "./donation.controllers";
import { CheckJWT } from "../middlewares/checkJWToken";
import { AuthorizeUser } from "../middlewares/authorizeUser";

const donationRouter: Router = Router();

donationRouter.post(
  "/post",
  CheckJWT,
  AuthorizeUser(["donor"]),
  CreateDonation,
);
donationRouter.get(
  "/get",
  CheckJWT,
  AuthorizeUser(["admin", "donor", "recipient"]),
  GetDonations,
);

donationRouter.get(
  "/get/forRecipient",
  CheckJWT,
  AuthorizeUser(["admin", "donor", "recipient"]),
  GetDonationsForRecipients,
);

donationRouter.get(
  "/get/claims",
  CheckJWT,
  AuthorizeUser(["recipient"]),
  GetClaimedDonations,
);

donationRouter.get(
  "/get/:id",
  CheckJWT,
  AuthorizeUser(["admin"]),
  GetDonationById,
);
donationRouter.get(
  "/history",
  CheckJWT,
  AuthorizeUser(["admin", "donor"]),
  GetPastHistory,
);
donationRouter.patch(
  "/update/:id",
  CheckJWT,
  AuthorizeUser(["admin", "donor"]),
  UpdateDonation,
);
donationRouter.delete(
  "/delete/:id",
  CheckJWT,
  AuthorizeUser(["admin", "donor"]),
  DeleteDonation,
);

export default donationRouter;
