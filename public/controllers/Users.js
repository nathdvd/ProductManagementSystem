import Product from "../models/Product.js";
import Order from "../models/Order.js";

class Users {
    constructor() {
        this.user = {};
        this.loggedIn = false;
    }
    index = (req, res) => {
        if (req.session.user) {
            this.user = req.session.user;
            this.loggedIn = true;
        } else {
            this.user = {};
            this.loggedIn = false;
        }
        res.render("users/index", {user: this.user, loggedIn: this.loggedIn, page: 'Home'});
    }

    categories = (req, res) => {
        res.render("users/categories", {user: this.user, loggedIn: this.loggedIn, page:'Categories'});
    }

    product_list_by_category = async (req, res) => {
        let result;
        if (req.params['category'] == 'drinks') {
            result = await Product.getProductsByCategory(1);
        } else if (req.params['category'] == 'snacks') {
            result = await Product.getProductsByCategory(2);
        } else if (req.params['category'] == 'fruits') {
            result = await Product.getProductsByCategory(3);
        } else if (req.params['category'] == 'laces') {
            result = await Product.getProductsByCategory(4);
        } else if (req.params['category'] = 'uniform') {
            result = await Product.getProductsByCategory(5);
        } else if (req.params['category'] = 'supplies') {
            result = await Product.getProductsByCategory(6);
        } else {
            res.redirect("/categories");
        }
        res.render("users/product-list", {user: this.user, loggedIn: this.loggedIn, page: 'Categories', products: result, category: req.params['category']});
    }

    product_display = async (req, res) => {
        let result = await Product.getProductById(req.params['id']);
        if (result == -1) {
            res.render("users/categories", {user: this.user, loggedIn: this.loggedIn, page:'Categories'});
        } else {
            res.render("users/item", {user: this.user, loggedIn: this.loggedIn, page: 'Categories', product: result});
        }
    }

    item = (req, res) => {
        res.render("users/item", {user: this.user, loggedIn: this.loggedIn, page: 'Categories'});
    }

    orders = (req, res) => {
        if(req.session.user) {
            res.render("users/orders", {user: this.user, loggedIn: this.loggedIn, page: 'Orders'});
        } else res.redirect("/");
    }

    cart = (req, res) => {
        if (req.session.user)
            res.render("users/cart", {user: this.user, loggedIn: this.loggedIn, page: 'Cart'});
        else res.redirect("/");
    }

    addToCart = async (req, res) => {
        if (req.session.user) {
            let result = await Order.addToCart(req.body);
            return result;
        } else res.redirect("/");
    }
}

export default Users;