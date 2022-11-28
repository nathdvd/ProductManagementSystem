const express = require("express");
const Router = express.Router();

const UsersController = require('../../controllers/Users');
const userController = new UsersController();

Router.get("/", userController.index);
Router.get("/categories", userController.categories);
Router.get("/orders", userController.orders);
Router.get("/item", userController.item);
Router.get("/cart", userController.cart);

module.exports = Router;