class Accounts {
    index = (req, res) => {
        res.render("accounts/index");
    }

    submit = (req, res) => {
        console.log(req.body);
        if (req.body["submit-form"] == "LOG IN") {
            req.session.account = 'user';
            res.redirect("/");
        } else {
            req.session.account = 'admin';
            res.redirect("/");
        }
    }
}

export default Accounts;