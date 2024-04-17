import { responseError } from './response';
import { NextFunction, Response, Request } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';

const extractedErrors = (errors: Result<ValidationError>) => {
  const validationErrors: { [key: string]: ValidationError } = errors.mapped();
  const filteredErrors = Object.fromEntries(
    Object.entries(validationErrors).map(([key, error]) => {
      if ('value' in error && 'msg' in error) {
        return [
          key,
          {
            value: error.value ?? '',
            message: error.msg,
          },
        ];
      }
      return [key, {}];
    })
  );

  return filteredErrors;
};

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (errors.isEmpty()) return next();
    responseError(res, 'Validation Error', extractedErrors(errors));
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
