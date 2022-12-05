import { Router as _Router } from "express";
const Router = _Router();

import UsersController from '../../controllers/Users.js';
const userController = new UsersController();

Router.get("/", userController.index);
Router.get("/categories", userController.categories);
Router.get("/orders", userController.orders);
Router.get("/item", userController.item);
Router.get("/cart", userController.cart);

export default Router;