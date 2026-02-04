import Product from "../models/product.js";


export const newProduct = async(req, res)=>{
    try {
        const {name, type, description, price} = req.body;
        if(!name || !type || !description || !price){
            return res.status(400).json({message:"All fields required"});
        }
        // checking product exist with the same name or not
        const existProduct = await Product.findOne({name:name});
        if(existProduct) return res.status(400).json({message:"Product exist"});

        const newProduct = new Product({name, type, description, price});
        await newProduct.save();

        res.status(400).json({message:"Product created"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
export const getAllProduct = async(req, res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({message:"All product", products:products})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
export const getProduct = async(req, res)=>{
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({message:"Product id is required"});

        const getTheProduct = await Product.findById(id);
        if(!getTheProduct) return res.status(400).json({message:"Product not found"});

        return res.status(200).json({message:"User found", Product:getTheProduct})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
export const updateProduct = async(req, res)=>{
    try {
        const {name, type, description, price} = req.body;
        const id = req.params.id
        if(!name || !type || !description || !price){
            return res.status(400).json({message:"All fields required"});
        }
        if(!id) return res.status(400).json({message:"Product id is required"});


        // checking product exist with the same name or not
        const existProduct = await Product.findOne({name:name});
        if(!existProduct) return res.status(400).json({message:"Product not exist"});

        await Product.findByIdAndUpdate(id, {name, type, description, price}, {new:true});
        return res.status(200).json({message:"User details updated"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
export const deleteProduct = async(req, res)=>{
    try {
        const id = req.query.id;
        if(!id) return res.status(400).json({message:"Product id is required"});

        const getProduct = await Product.findById(id);
        if(!getProduct) return res.status(400).json({message:"Product not found"});

        await Product.findByIdAndDelete(id);
        return res.status(200).json({message:"Product Deleted"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}