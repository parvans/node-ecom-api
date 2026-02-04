import exprss from 'express';
import { deletePurchase, getAllPurchase, getPurchase, newPurchase } from '../controllers/purchase.controller.js';
import { protectRoute } from '../middleware/auth.js';

const route = exprss.Router();

route.post('/new',protectRoute,newPurchase);
route.get('/get/:id',protectRoute,getPurchase);
route.get('/getall',protectRoute,getAllPurchase);
// route.put('/update',);
route.delete('/delete',protectRoute,deletePurchase);

export default route;