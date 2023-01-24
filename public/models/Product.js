import getPool from '../config/db.js';
import validator from 'validator';

class Product {

    async getProducts() {
        const [result] = await getPool().query("SELECT id, retail_store_id, category_id, name, description, image_url, price, stock FROM products ORDER BY id DESC");

        return result;
    }

    async getProductById(id) {
        const [result] = await getPool().query("SELECT id, name, description, image_url, rating, price, stock FROM products WHERE id = ?", [id]);

        return result[0];
    }

    async getProductsByCategory(category_id) {
        const [result] = await getPool().query("SELECT id, retail_store_id, name, description, image_url, price, stock FROM products WHERE category_id = ? ORDER BY name", [category_id]);

        return result;
    }

    async addProduct(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");

        const [result] = await getPool().query("INSERT INTO products(retail_store_id, category_id, name, description, image_url, rating, price, stock, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)", [post['store'], post['category'], post['name'], post['desc'], post['img-url'], 0, post['price'], post['stock'], datenow, datenow]);

        return result.insertId;
    }

    async updateProduct(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");

        let result;

        if (post['img-url'] == false) {
            const [res] = await getPool().query("UPDATE products SET retail_store_id = ?, category_id = ?, name = ?, description = ?, price = ?, stock = ?, updated_at = ? WHERE id = ?", [ post['store'], post['category'], post['name'], post['desc'], post['price'], post['stock'], datenow, post['id']]);

            result = res;
        } else {
            const [res] = await getPool().query("UPDATE products SET retail_store_id = ?, name = ?, description = ?, image_url = ?, price = ?, stock = ?, updated_at = ? WHERE id = ?", [ post['store'], post['name'], post['desc'], post['img-url'], post['price'], post['stock'], datenow, post['id']]);

            result = res;
        }

        return result;
    }

    async deleteProduct(id) {
        const [result] = await getPool().query("DELETE FROM products WHERE id = ?", [id]);

        return result;
    }

    async decrementStock(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");
        const [result] = await getPool().query("UPDATE products SET stock = ?, updated_at = ? WHERE id = ?", [ post['stock'], datenow, post['product']]);

        return result;
    }
}

export default new Product();