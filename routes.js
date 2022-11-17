const Express = require("express");
const Router = Express.Router();

const controller = require('./controllers/Users');
const UsersController = new controller();

Router.get("/", UsersController.index);
Router.get("/categories", UsersController.categories);
Router.get("/item", UsersController.item);
Router.get("/orders", UsersController.orders);
Router.get("/cart", UsersController.cart);

module.exports = Router;