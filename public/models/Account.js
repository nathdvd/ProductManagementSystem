import getPool from '../config/db.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';

class Account {

    async getUserByEmail(email) {
        const [result] = await getPool().query("SELECT users.id, users.first_name, users.last_name, users.email, users.password, user_roles.role_name, user_roles.role_level FROM users INNER JOIN user_roles ON users.user_role_id = user_roles.id WHERE email = ?", [email]);

        return result[0];
    }

    async addUser(post, user_role_id) {
        const salt = bcrypt.genSaltSync();
        const hashedpw = bcrypt.hashSync(post.password, salt);
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");

        const [result] = await getPool().query("INSERT INTO users(user_role_id, first_name, last_name, email, password, created_at, updated_at) VALUES (?,?,?,?,?,?,?)", [user_role_id, post['first-name'], post['last-name'], post.email, hashedpw, datenow, datenow]);

        //console.log(result.insertId);
        return result.insertId;

    }

    async authenticateUser(post) {
        let status = this.validateSubmit(post);

        if (status == 1) {
            const user = await this.getUserByEmail(post.email);
            if (user == undefined || !bcrypt.compareSync(post.password, user.password)) return false;
            else return {id: user.id, fn: user.first_name, ln: user.last_name, email: user.email, role: user.role_name, level: user.role_level};
        } else if (status == 2) {
            return await this.addUser(post, 3) ? true : false;
        } else {
            return false;
        }

    }

    validateSubmit(post) {
        
        const loginfields = [
            validator.isEmpty(post['first-name']),
            validator.isEmpty(post['last-name']),
            validator.isEmail(post.email),
            !validator.isEmpty(post.password),
            validator.isEmpty(post.confirm)
        ];
        

        if (loginfields.includes(false)) {
            const registerfields = [
                validator.isAlpha(post['first-name']),
                validator.isLength(post['first-name'], {min: 2, max: 50}),
                validator.isAlpha(post['last-name']),
                validator.isLength(post['last-name'], {min: 2, max: 50}),
                loginfields[2],
                validator.isLength(post.password, {min: 6}),
                post.password == post.confirm
            ];

            if (registerfields.includes(false)) return 0; //incomplete form
            else return 2; //sign up form

        } else return 1; //login form

    }

    validateNewAdmin(post) {
        const registerfields = [
            validator.isAlpha(post['first-name']),
            validator.isLength(post['first-name'], {min: 2, max: 50}),
            validator.isAlpha(post['last-name']),
            validator.isLength(post['last-name'], {min: 2, max: 50}),
            validator.isEmail(post.email),
            //validator manages retail stores
        ];


    }

}

export default new Account();