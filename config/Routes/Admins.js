const express = require("express");
const Router = express.Router();

const AdminsController = require('../../controllers/Admins');
const adminController = new AdminsController();

Router.get("/", adminController.index);
Router.get("/products", adminController.products);
Router.get("/orders", adminController.orders);
Router.get("/revenue", adminController.revenue);

module.exports = Router;