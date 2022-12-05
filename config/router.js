import { Router as _Router } from "express";
const mainRouter = _Router();

import adminRouter from "./Routes/Admins.js";
import userRouter from "./Routes/Users.js";
import accountRouter from "./Routes/Accounts.js"; 

mainRouter.use("/", adminRouter);
mainRouter.use("/", userRouter);
mainRouter.use("/", accountRouter);

export default mainRouter;