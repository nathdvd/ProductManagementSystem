import { Router as _Router } from "express";
import UsersController from '../../controllers/Users.js';

const Router = _Router();
const userController = new UsersController();

Router.get("/", userController.index);
Router.get("/categories", userController.categories);
Router.get("/orders", userController.orders);
Router.get("/cart", userController.cart);

Router.get("/products/:category", userController.product_list_by_category);
Router.get("/products/:category/:id", userController.product_display);

Router.post("/addToCart", userController.addToCart);
Router.post("/clearCart", userController.clearCart);
Router.post("/placeOrder", userController.placeOrder);

export default Router;