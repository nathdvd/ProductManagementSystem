import getPool from '../config/db.js';
import validator from 'validator';

class Order {

    async getOrders(id) {
        const [result] = await getPool().query("SELECT orders.id, location.location, orders.status, orders.created_at FROM orders INNER JOIN location ON location.id = orders.location_id WHERE orders.user_id = ? ORDER BY orders.created_at DESC", [id]);

        for (const order of result) {
            const [items, total] = await this.getOrderDetail(order.id);
            order.items = items;
            order.total = total;
        }
        return result;
    }

    async getOrderDetail(id) {
        const [result] = await getPool().query("SELECT products.name, products.image_url, order_details.price, order_details.quantity FROM order_details INNER JOIN products ON order_details.product_id = products.id WHERE order_details.order_id = ?", [id]);

        let total = 0;
        for (const item of result) {
            total += item.price * item.quantity;
        }

        return [result, total];
    }

    async getOrdersByAdmin() {
        const [result] = await getPool().query("SELECT orders.id, users.first_name, users.last_name, location.location, orders.status, orders.created_at FROM orders INNER JOIN location ON location.id = orders.location_id INNER JOIN users on orders.user_id = users.id ORDER BY orders.created_at DESC");

        for (const order of result) {
            const [items, total] = await this.getOrderDetail(order.id);
            order.items = items;
            order.total = total;
        }
        return result;
    }

    getOrderById() {
        
    }

    

    getOrderByStatus(status) {

    }

    async updateOrderStatus(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");

        const [result] = await getPool().query("UPDATE orders SET status = ?, updated_at = ? WHERE id = ?", [post['status'], datenow, post['id']]);
        
        return result;
    }

    async addOrder(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");
        
        let conn;
        try {
            conn = await getPool().getConnection();
            await conn.beginTransaction();

            const [result1] = await conn.query("INSERT INTO orders(user_id, location_id, status, created_at, updated_at) VALUES(?,?,?,?,?)", [post['user'], post['location'], 'In Preparation', datenow, datenow]);
        
            const cart = JSON.parse(post['cart']);
            console.log(cart);
            
            cart.forEach( async (product) => {
                let [result2] = await conn.query("SELECT stock FROM products WHERE id = ?", product.pid);
                result2 = result2[0];

                if (result2.stock - product.quantity < 0) {
                    if (conn) {
                        await conn.rollback();
                        await conn.release();
                    }
                    throw "Not enough stock";
                }

                const left = parseInt(result2.stock) - parseInt(product.quantity);
                await conn.query("UPDATE products SET stock = ? WHERE id = ?", [left, product.pid]);
                await conn.query("INSERT INTO order_details(order_id, product_id, price, quantity, created_at, updated_at) VALUES(?,?,?,?,?,?)", [result1.insertId, product.pid, product.price, product.quantity, datenow, datenow]);
                await conn.query("DELETE FROM cart WHERE id = ?", product.id);
            });

            await conn.commit();
        } catch (error) {
            if (conn) await conn.rollback();
            throw error;
        } finally {
            if (conn) await conn.release();
        }

        return {result: 1};
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
        const [result] = await getPool().query("SELECT cart.id AS 'id', products.id AS 'pid', products.name, products.description, products.image_url, products.price, products.stock, cart.quantity FROM products INNER JOIN cart ON products.id = cart.product_id WHERE cart.user_id = ?", [id]);

        return result;
    }

    async addToCart(post) {
        const datenow = new Date().toISOString().slice(0,19).replace("T", " ");

        const [cart] = await getPool().query("SELECT product_id, quantity FROM cart WHERE user_id = ?", [post['user']]);

        let result;
        cart.forEach(async (item) => {
            if (parseInt(item.product_id) == parseInt(post['product'])) {
                let new_quantity = item.quantity + post['quantity'];
                result = await getPool().query("UPDATE cart SET quantity = ? WHERE product_id = ? AND user_id = ?", [new_quantity, post['product'], post['user']]);
                return {id: post['product'], result: result};
            }
        });

        result = await getPool().query("INSERT INTO cart(user_id, product_id, quantity, created_at, updated_at) VALUES (?,?,?,?,?)", [post['user'], post['product'], post['quantity'], datenow, datenow]);

        return {id: result.insertId, result: result};
    }
}

export default new Order();