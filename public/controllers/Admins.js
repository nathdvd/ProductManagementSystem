import Product from "../models/Product.js";
import Order from "../models/Order.js";

class Admins {
    index = (req, res, next) => {
        if (req.session.user && req.session.user.role == "ADMIN") {
            res.render("admins/index", {user: req.session.user, page: "Home"});
        } else {
            next();
        }

    }

    products = async (req, res) => {
        if (req.session.user && req.session.user.role == "ADMIN") {
            let products = await Product.getProducts();
            res.render("admins/products",{user: req.session.user, page: "Products", products: products});
        } else {
            res.redirect("/");
        }
    }

    orders = async (req, res, next) => {
        if (req.session.user && req.session.user.role == "ADMIN") {
            let orders = await Order.getOrdersByAdmin();
            res.render("admins/orders", {user: req.session.user, page: "Orders", orders: orders});
        } else {
            next();
        }
    }

    revenue = (req, res) => {
        if (req.session.user && req.session.user.role == "ADMIN") {
            res.render("admins/revenue", {user: req.session.user, page: "Revenue"});
        } else {
            res.redirect("/");
        }
    }

    updateOrderStatus = async (req, res) => {
        if (req.session.user && req.session.user.role == "ADMIN") {
            await Order.updateOrderStatus(req.body);
            res.sendStatus(200);
        } else {
            res.redirect("/");
        }
    }
}

export default Admins;