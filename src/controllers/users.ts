import { Request, Response } from 'express';
import { User } from '../entity/user';
import PostgreSQL from '../config/postgresql';
import { responseError, responseSuccess } from '../utils/response';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    const users = (await dataSource.getRepository(User).find()).filter(
      (user) => user.active
    );

    if (!users) {
      responseError(res, 'Users not found', 'Users not found', 404);
      return;
    }

    responseSuccess(
      res,
      'Users found',
      users.map((user) => {
        return {
          value: user.id,
          label: user.first_name + ' ' + user.last_name,
        };
      })
    );
  } catch (error) {
    responseError(res, 'Failed to retrieve Users', `${error}`, 500);
  }
};
