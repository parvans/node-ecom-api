import mongoose from "mongoose";


const Purchase = mongoose.model("Purchase", new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"Product"
    },
    BuyerId:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"User"
    },
},{
    timestamps:true
}
));

export default Purchase