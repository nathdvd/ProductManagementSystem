import User from "../models/User.js";

class Users {
    index = (req, res) => {
        res.render("users/index");
    }

    categories = (req, res) => {
        res.render("users/categories");
    }

    item = (req, res) => {
        res.render("users/item");
    }

    orders = (req, res) => {
        res.render("users/orders");
    }

    cart = async (req, res) => {
        const users = await User.getUsers();
        console.log(users);
        res.render("users/cart");

    }
}

export default Users;