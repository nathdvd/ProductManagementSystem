import { Router as _Router } from "express";
import adminRouter from "./Routes/Admins.js";
import userRouter from "./Routes/Users.js";
import accountRouter from "./Routes/Accounts.js";

const mainRouter = _Router();

mainRouter.use("/", adminRouter);
mainRouter.use("/", userRouter);
mainRouter.use("/", accountRouter);

export default mainRouter;