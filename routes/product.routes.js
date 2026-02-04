import exprss from 'express';
import { deleteProduct, getAllProduct, getProduct, newProduct, updateProduct } from '../controllers/product.controller.js';
import { protectRoute } from '../middleware/auth.js';

const route = exprss.Router();

route.post('/new',protectRoute,newProduct);
route.get('/get/:id',protectRoute,getProduct);
route.get('/getall',protectRoute,getAllProduct);
route.put('/update',protectRoute,updateProduct);
route.delete('/delete',protectRoute,deleteProduct);

export default route;