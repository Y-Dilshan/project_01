import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct, getPrtoductByID } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.post('/', createProduct);
productRouter.delete('/:productID', deleteProduct); 
productRouter.put('/:productID', updateProduct);
productRouter.get('/:productID', getPrtoductByID);

export default productRouter;