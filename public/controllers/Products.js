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
}

export default Products;