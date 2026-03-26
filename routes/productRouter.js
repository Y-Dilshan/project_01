import express from "express";
import { createProduct, getProduct, deleteProduct } from "../controllers/productController";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/:id", getProduct);
productRouter.get("/byName",getProducByName)
productRouter.delete("/:id", deleteProduct);