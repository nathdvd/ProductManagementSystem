import { Router as _Router } from "express";
const Router = _Router();

import AccountsController from '../../controllers/Accounts.js';
const accountController = new AccountsController();

Router.get("/login", accountController.index);

Router.post("/submit", accountController.submit);

export default Router;