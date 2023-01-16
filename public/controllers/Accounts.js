import Account from "../models/Account.js";

class Accounts {
    index = (req, res) => {
        res.render("accounts/index");
    }

    submit = async (req, res) => {
        const results = await Account.authenticateUser(req.body);
        
        if (typeof(results) === 'object') {
            req.session.user = results;
            res.redirect("/");
        } else {
            if (results) console.log("Registered successfully!");
            else console.log("Invalid credentials.");
            res.redirect("/login");
        }
        
    }

    profile = (req, res) => {
        if (!req.session || !req.session.user) {
            res.redirect("/");
        } else {
            res.render("accounts/profile", {user: req.session.user});
        }
    }

    headAdminSettings = (req, res) => {

    }

    addAdmin = (req, res) => {

    }

    
}

export default Accounts;