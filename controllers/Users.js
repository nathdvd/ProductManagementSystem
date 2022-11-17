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

    cart = (req, res) => {
        res.render("users/cart");
    }
}

module.exports = Users;