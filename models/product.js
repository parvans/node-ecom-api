import mongoose from "mongoose";


const Product = mongoose.model("Product", new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    type:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true,
        unique:true
    },
},{
    timestamps:true
}
));

export default Product