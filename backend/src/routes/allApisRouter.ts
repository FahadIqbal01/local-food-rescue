import { Router } from "express";

import userRouter from "../user/user.routes";

const allApiRouter = Router();

allApiRouter.use("/user", userRouter);

export default allApiRouter;
