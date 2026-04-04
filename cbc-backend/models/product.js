import mongoose from "mongoose";

const productSchema = new mongoose.schemma({
    productID :{
        trype : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true
    },

    altNames : {
        type : [String],
        default : [],
    }, 

    description : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    labelPrice : {
        type : Number,
        required : true
    },

    images : {
        type : [String],
        required : true
    },

    category : {
        type : String,
        required : true
    },

    brand : {
        type : String,
        required : true,
        default : "No Brand"
    },

    stock : {
        type : Number,
        required : true,
        default : 0
    },

    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;