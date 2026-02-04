import Purchase from "../models/purchase.js";


export const newPurchase = async(req, res)=>{
    try {
        const {productId, BuyerId} = req.body;
        const user = req.user;
        if(!user) return res.status(400).json({message:"User is not login"});
        if(!productId || !BuyerId){
            return res.status(400).json({message:"All fields required"});
        }        
        const newPurchase = new Purchase({productId, BuyerId});
        await newPurchase.save();

        res.status(400).json({message:"Product created"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
export const getAllPurchase = async(req, res)=>{
    try {
        const purchases = await Purchase.find();
        res.status(200).json({message:"All Pruchase", purchases:purchases})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
export const getPurchase = async(req, res)=>{
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({message:"Purchase id is required"});

        const getThePurchase = await Purchase.findById(id);
        if(!getThePurchase) return res.status(400).json({message:"Purchase not found"});

        return res.status(200).json({message:"User found", Purchase:getThePurchase})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

export const deletePurchase = async(req, res)=>{
    try {
        const id = req.query.id;
        if(!id) return res.status(400).json({message:"Purchase id is required"});

        const getPurchase = await Purchase.findById(id);
        if(!getPurchase) return res.status(400).json({message:"Purchase not found"});

        await Purchase.findByIdAndDelete(id);
        return res.status(200).json({message:"Purchase Deleted"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}