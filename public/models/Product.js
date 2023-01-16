import getPool from '../config/db.js';
import validator from 'validator';

class Product {

    getProducts() {

    }

    getProductById() {
        
    }

    async addProduct(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");

        const [result] = await getPool().query("INSERT INTO products(retail_store_id, name, description, image_url, rating, price, stock, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?)", [post['store'], post['name'], post['desc'], post['img-url'], 0, post['price'], post['stock'], datenow, datenow]);

        return result.insertId;
    }

    updateProduct(post) {

    }

    removeProduct(id) {

    }

    markAsSoldOut(id) {

    }

    updateStocks(id) {

    }
}

export default new Product();