class Users {
    constructor() {
        this.user = {};
        this.loggedIn = false;
    }
    index = (req, res) => {
        if (req.session.user) {
            this.user = req.session.user;
            this.loggedIn = true;
        }
        res.render("users/index", {user: this.user, loggedIn: this.loggedIn, page: 'Home'});
    }

    categories = (req, res) => {
        res.render("users/categories", {user: this.user, loggedIn: this.loggedIn, page:'Categories'});
    }

    item = (req, res) => {
        res.render("users/item", {user: this.user, loggedIn: this.loggedIn, page: 'Categories'});
    }

    orders = (req, res) => {
        res.render("users/orders", {user: this.user, loggedIn: this.loggedIn, page: 'Orders'});
    }

    cart = (req, res) => {
        res.render("users/cart", {user: this.user, loggedIn: this.loggedIn, page: 'Cart'});

    }
}

export default Users;