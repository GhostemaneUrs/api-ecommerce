import express from 'express';
import {
  getProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from '../controllers/products';
import {
  idProductValidator,
  removeProductValidator,
  valuesProductValidator,
} from '../validators/products';

const router = express.Router();
router.get('/', getProducts);
router.get('/:id', idProductValidator, getProductById);
router.post('/', valuesProductValidator, createProduct);
router.put('/:id', idProductValidator, valuesProductValidator, updateProduct);
router.patch('/:id', idProductValidator, removeProductValidator, deleteProduct);
module.exports = router;
