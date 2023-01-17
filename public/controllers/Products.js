import Product from "../models/Product.js";

class Products {
    addProduct = async (req,res) => {
        let post = req.body;
        post['img-url'] = req.file.path;
            
        console.log(post);
        const id = await Product.addProduct(post); 
        console.log("Product ID: "+id);
        res.redirect("/products");
    }

    editProduct = async (req, res) => {
        let post = req.body;
        post['id'] = req.params.id;
        post['img-url'] = false;
        if (req.file && req.file.path) {
            post['img-url'] = req.file.path;
        }
        const result = await Product.updateProduct(post);
        console.log(result);
        res.redirect("/products");
    }

    deleteProduct = async (req, res) => {
        const result = await Product.deleteProduct(req.params.id);
        console.log(result);
        res.redirect('/products');
    }
}

export default Products;