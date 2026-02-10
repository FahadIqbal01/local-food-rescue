import { Router } from "express";

import userRouter from "../user/user.routes";
import donationRouter from "../donation/donation.routes";
import adminRouter from "../admin/admin.routes";
import recipientRouter from "../recipient/recipient.routes";
import forgotPasswordRouter from "../forgotPassword/forgotPassword.routes";

const allApiRouter = Router();

allApiRouter.use("/user", userRouter);
allApiRouter.use("/donation", donationRouter);
allApiRouter.use("/admin", adminRouter);
allApiRouter.use("/recipient", recipientRouter);
allApiRouter.use("/forgot", forgotPasswordRouter);

export default allApiRouter;
