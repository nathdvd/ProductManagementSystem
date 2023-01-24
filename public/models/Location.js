import getPool from '../config/db.js';
import validator from 'validator';

class Location {

    async getLocation() {
        const [result] = await getPool().query("SELECT id, location FROM location ORDER BY location");

        return result;
    }
}

export default new Location();