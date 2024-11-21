import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    "ProductName":{
        type:String,
        required:true
    },
    "ProductPrice":{
        type:String,
        required:true
    },
    "ProductBarcode":{
        type:Number,
        required:true
    }
})

export default ProductSchema;