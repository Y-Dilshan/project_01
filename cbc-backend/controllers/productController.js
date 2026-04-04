import Product from "../models/product.js";
import { isAdmin } from "./authController.js";

export function createProduct(req, res){
    
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return;
    }

    const product = new Product(req.body);

    product.save().them(
    ()=> {
        res.json({
            message : "Product created successfully"
        })
    }
    ).catch((err) => {
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        })
    });
}

export function getAllProducts(req, res){
    if(isAdmin(req)){
        Product.find()
    }else {
        Product.find({isAvailable : true})
    }
}