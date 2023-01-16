import { Router as _Router } from "express";
import AccountsController from '../../controllers/Accounts.js';

const Router = _Router();
const accountController = new AccountsController();

Router.get("/login", accountController.index);

Router.post("/submit", accountController.submit);

Router.get("/profile", accountController.profile);

Router.post("/addAdmin", accountController.addAdmin);

export default Router;