import exprss from 'express';
import { createUser, deleteUser, getUser, getUsers, loginUser, updateUser } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.js';

const route = exprss.Router();

route.post('/register',createUser);
route.post('/login',loginUser);
route.get('/get/:id',protectRoute,getUser);
route.get('/getall',protectRoute,getUsers);
route.put('/update/:id',protectRoute,updateUser);
route.delete('/delete',protectRoute,deleteUser);

export default route;