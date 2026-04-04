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
    }
})

