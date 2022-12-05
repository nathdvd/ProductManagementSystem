import { Router as _Router } from "express";
const adminRouter = _Router();

import AdminsController from '../../controllers/Admins.js';
const adminController = new AdminsController();

adminRouter.get("/", adminController.index);
adminRouter.get("/products", adminController.products);
adminRouter.get("/orders", adminController.orders);
adminRouter.get("/revenue", adminController.revenue);

export default adminRouter;