class Admins {
    index = (req, res, next) => {
        if (req.session.account == "admin") {
            res.render("admins/index");
        } else {
            next();
        }

    }

    products = (req, res) => {
        if (req.session.account == "admin") {
            res.render("admins/products");
        } else {
            res.redirect("/");
        }
    }

    orders = (req, res, next) => {
        if (req.session.account == "admin") {
            res.render("admins/orders");
        } else {
            next();
        }
    }

    revenue = (req, res) => {
        if (req.session.account == "admin") {
            res.render("admins/revenue");
        } else {
            res.redirect("/");
        }
    }
}

export default Admins;