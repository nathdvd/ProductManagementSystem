import Account from "../models/Account.js";

class Accounts {
    index = (req, res) => {
        res.render("accounts/index", {message: "None"});
    }

    logout = (req, res) => {
        delete req.session.user;
        res.redirect("/");
    }

    submit = async (req, res) => {
        const results = await Account.authenticateUser(req.body);
        
        if (typeof(results) === 'object') {
            req.session.user = results;
            res.redirect("/");
        } else {
            if (results) res.render("accounts/index", {message: "Registered Successfully"});
            else res.render("accounts/index", {message: "Invalid Credentials."});
        }
        
    }

    profile = (req, res) => {
        if (!req.session || !req.session.user) {
            res.redirect("/");
        } else {
            res.render("accounts/edit-profile", {user: req.session.user, message: "None"});
        }
    }

    updatePassword = async (req, res) => {
        if (!req.session || !req.session.user) res.redirect("/");
        else {

        let post = req.body;
        post.id = req.session.user.id;
        const results = await Account.updatePassword(post);

        if (results == 0) res.render("accounts/edit-profile", {user: req.session.user, message: "Failed to change password."});
        else res.render("accounts/edit-profile", {user: req.session.user, message: "Successfully changed password."});
        }
    }

    updateContact = async (req, res) => {
        if (!req.session || !req.session.user) res.redirect("/");
        else {

        let post = req.body;
        post.id = req.session.user.id;
        const results = await Account.updateContact(post);

        if (results == 0) res.render("accounts/edit-profile", {user: req.session.user, message: "Failed to change contact number."});
        else {
            let user = req.session.user;
            user['contact'] = req.body.contact;
            delete req.session.user;
            req.session.user = user;
            res.render("accounts/edit-profile", {user: user, message: "Successfully changed contact number."});
        } 
        }
    }

    addAdmin = async (req, res) => {
        if (!req.session || !req.session.user || req.session.user.level !== 1) res.redirect("/");
        else {

        const results = await Account.addNewAdmin(req.body);

        if (!results) res.render("admins/add-admin", {user: req.session.user, page: "None", message: "Failed to add admin."});
        else res.render("admins/add-admin", {user: req.session.user, page: "None", message: "Successfully added new admin."});
        }
    }

    
}

export default Accounts;