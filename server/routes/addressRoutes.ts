import express from 'express'
import { addAddress, deleteAddress, getAddresses, updateAddress } from '../controllers/addressController.js';
import auth from '../middleware/auth.js';
const addressRouter = express.Router();

//'auth' is used bcos it is only accessible to login users
addressRouter.get('/',auth, getAddresses);
addressRouter.post('/',auth, addAddress);
addressRouter.put('/:id',auth, updateAddress);
addressRouter.delete('/:id',auth, deleteAddress);


export default addressRouter;