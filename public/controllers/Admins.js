import Product from "../models/Product.js";

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

    orders = (req, res, next) => {
        if (req.session.user && req.session.user.role == "ADMIN") {
            res.render("admins/orders", {user: req.session.user, page: "Orders"});
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
}

export default Admins;