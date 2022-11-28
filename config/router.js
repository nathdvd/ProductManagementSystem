const express = require("express");
const Router = express.Router();

const adminRouter = require("./Routes/Admins");
const userRouter = require("./Routes/Users");
const accountRouter = require("./Routes/Accounts"); 

Router.use("/", adminRouter);
Router.use("/", userRouter);
Router.use("/", accountRouter);

module.exports = Router;