const express = require("express");
const Router = express.Router();

const AccountsController = require('../../controllers/Accounts');
const accountController = new AccountsController();

Router.get("/login", accountController.index);

Router.post("/submit", accountController.submit);

module.exports = Router;