import { Router as _Router } from "express";
import AdminsController from '../../controllers/Admins.js';
import ProductsController from "../../controllers/Products.js";
import { upload } from "../../middleware/multer.js";

const adminRouter = _Router();
const adminController = new AdminsController();
const productController = new ProductsController();

adminRouter.get("/", adminController.index);
adminRouter.get("/products", adminController.products);
adminRouter.get("/orders", adminController.orders);
adminRouter.get("/revenue", adminController.revenue);
adminRouter.post("/addProduct", upload, productController.addProduct);
adminRouter.post("/editProduct/:id", upload, productController.editProduct);
adminRouter.post("/deleteProduct/:id", productController.deleteProduct);
adminRouter.post("/updateOrderStatus", adminController.updateOrderStatus);

export default adminRouter;