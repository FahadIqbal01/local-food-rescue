import { Router } from "express";

import {
  CreateUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  LoginUser,
  VerifyUser,
} from "./user.controllers";
import { CheckJWT } from "../middlewares/checkJWToken";
import { AuthorizeUser } from "../middlewares/authorizeUser";

const userRouter = Router();

userRouter.post("/post", CreateUser);
userRouter.get("/get", CheckJWT, AuthorizeUser(["admin"]), GetAllUsers);
userRouter.get("/get/:id", GetUserById);
userRouter.patch(
  "/patch/:id",
  CheckJWT,
  AuthorizeUser(["admin", "donor", "recipient"]),
  UpdateUser,
);
userRouter.delete(
  "/delete/:id",
  CheckJWT,
  AuthorizeUser(["admin", "donor", "recipient"]),
  DeleteUser,
);
userRouter.post("/login", LoginUser);
userRouter.post("/verify", VerifyUser);

export default userRouter;
