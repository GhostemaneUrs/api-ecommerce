import express from 'express';
import {
  getQuotations,
  createQuotation,
  deleteQuotation,
  getQuotationById,
  updateQuotation,
} from '../controllers/quotations';
import {
  idQuotationValidator,
  removeQuotationValidator,
  valuesQuotationValidator,
} from '../validators/quotations';

const router = express.Router();
router.get('/', getQuotations);
router.get('/:id', idQuotationValidator, getQuotationById);
router.post('/', valuesQuotationValidator, createQuotation);
router.put(
  '/:id',
  idQuotationValidator,
  valuesQuotationValidator,
  updateQuotation
);
router.patch(
  '/:id',
  idQuotationValidator,
  removeQuotationValidator,
  deleteQuotation
);
module.exports = router;
