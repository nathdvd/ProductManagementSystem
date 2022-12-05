import getPool from '../config/db.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';

class User {

    async getUsers() {
        const [result] = await getPool().query("SELECT * FROM users");
        return result;
    }
}

export default new User();