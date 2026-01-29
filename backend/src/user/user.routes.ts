import { Router } from "express";

import {
  CreateUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
} from "./user.controllers";

const userRouter = Router();

userRouter.post("/post", CreateUser);
userRouter.get("/get", GetAllUsers);
userRouter.get("/get/:id", GetUserById);
userRouter.patch("/patch/:id", UpdateUser);
userRouter.delete("/delete/:id", DeleteUser);

export default userRouter;
