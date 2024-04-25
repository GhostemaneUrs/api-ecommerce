import { responseError, responseSuccess } from '../utils/response';

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //   responseSuccess({}, 'File uploaded successfully', {}, 201);
  } catch (error) {
    //   responseError(res, 'Failed to upload file', `${error}`);
  }
};
