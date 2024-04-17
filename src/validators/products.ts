import { check } from 'express-validator';
import { validateResult } from '../utils/validations';
import { NextFunction, Response, Request } from 'express';

export const idProductValidator = [
  check('id').exists().notEmpty().isUUID(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
];

export const valuesProductValidator = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  check('category')
    .notEmpty()
    .withMessage('Category is required')
    .isString()
    .withMessage('Category must be a string'),

  check('image')
    .notEmpty()
    .withMessage('Image is required')
    .isURL()
    .withMessage('Image must be a valid URL'),

  check('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a numeric value'),

  check('active').optional().isBoolean(),

  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
];

export const removeProductValidator = [
  check('active')
    .notEmpty()
    .withMessage('Active is required')
    .isBoolean()
    .withMessage('Active must be a boolean'),

  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
];
