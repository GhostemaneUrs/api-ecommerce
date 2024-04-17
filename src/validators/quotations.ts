import { check } from 'express-validator';
import { validateResult } from '../utils/validations';
import { NextFunction, Response, Request } from 'express';

export const idQuotationValidator = [
  check('id').exists().notEmpty().isUUID(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
];

export const valuesQuotationValidator = [
  check('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isNumeric()
    .withMessage('Quantity must be a string'),

  check('user_id').notEmpty().withMessage('User is required'),
  check('product_id').notEmpty().withMessage('Product is required'),
  check('active').optional().isBoolean(),

  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
];

export const removeQuotationValidator = [
  check('active')
    .notEmpty()
    .withMessage('Active is required')
    .isBoolean()
    .withMessage('Active must be a boolean'),

  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
];
