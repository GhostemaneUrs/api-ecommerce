import { Response } from 'express';

export const responseError = (
  res: Response,
  message: string,
  error: string | Record<string, any>,
  status: number = 403
) => {
  res.status(status);
  res.send({
    statusCode: status,
    message: message,
    errors: error,
  });
};

export const responseSuccess = (
  res: Response,
  message: string,
  data: Record<string, any>,
  status: number = 200
) => {
  res.status(status);
  res.send({
    statusCode: status,
    message,
    data,
  });
};
