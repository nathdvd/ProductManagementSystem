import getPool from '../config/db.js';
import validator from 'validator';

class Order {

    getOrders() {
        
    }

    getOrderById() {
        
    }

    getOrderDetail() {

    }

    getOrderByStatus(status) {

    }

    async addOrder(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");
        
        const [result1] = await getPool().query("INSERT INTO orders(user_id, location_id, status, created_at, updated_at) VALUES(?,?,?,?,?)", [post['user'], post['location'], 'In Preparation', datenow, datenow]);

        let result = 1;
        const cart = this.getCart(post['user']);
        for (product of cart) {
            const [result2] = await getPool().query("INSERT INTO orderDetails(order_id, product_id, price, quantity, created_at, updated_at) VALUES(?,?,?,?,?,?)", [result1.insertId, product.id, product.price, product.quantity, datenow, datenow]);

            result = result && result2;
        }

        return result;
    }

    async addSingleOrder(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");

        const [result1] = await getPool().query("INSERT INTO orders(user_id, location_id, status, created_at, updated_at) VALUES(?,?,?,?,?)", [post['user'], post['location'], 'In Preparation', datenow, datenow]);

        const [result2] = await getPool().query("INSERT INTO orderDetails(order_id, product_id, price, quantity, created_at, updated_at) VALUES(?,?,?,?,?,?)", [result1.insertId, post['product'], post['price'], post['quantity'], datenow, datenow]);

        return result2.insertId;
    }

    async clearCart(id) {
        const [result] = await getPool().query("DELETE FROM cart WHERE user_id = ?", [id]);

        return result;
    }

    async getCart(id) {
        const [result] = await getPool().query("SELECT products.id, products.name, products.description, products.image_url, products.price, products.stock, cart.quantity FROM products INNER JOIN cart ON products.id = cart.product_id WHERE cart.user_id = 1 = ?", [id]);

        return result;
    }

    async addToCart(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");

        const [result] = await getPool().query("INSERT INTO cart(user_id, product_id, quantity, created_at, updated_at) VALUES (?,?,?,?,?)", [post['user'], post['product'], post['quantity'], datenow, datenow]);

        return result.insertId;
    }
}

export default new Order();