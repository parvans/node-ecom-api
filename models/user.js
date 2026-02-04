import mongoose from "mongoose";


const User = mongoose.model("User", new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    }
},
    {
    timestamps:true
    }
));

export default User