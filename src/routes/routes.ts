import express from 'express';
const router = express.Router();
import getAllProductInStock from "../controllers/allProductsInStock";
import userWithSpecialPrice from '../controllers/userWithSpecialPrice';

// Definir rutas aquí
router.get('/products', getAllProductInStock); // Se solicita todos los productos con Stocks
router.get('/price/:user_id/:nombre_producto', userWithSpecialPrice); // Se solicita el precio del producto.

export default router;
