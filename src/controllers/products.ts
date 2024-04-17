import { Request, Response } from 'express';
import { Product } from '../entity/product';
import PostgreSQL from '../config/postgresql';
import { matchedData } from 'express-validator';
import { responseError, responseSuccess } from '../utils/response';

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    const products = (await dataSource.getRepository(Product).find()).filter(
      (product) => product.active
    );

    if (!products) {
      responseError(res, 'Products not found', 'Products not found', 404);
      return;
    }

    responseSuccess(res, 'Products found', products);
  } catch (error) {
    responseError(res, 'Failed to retrieve products', `${error}`, 500);
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();

    const product = await dataSource
      .getRepository(Product)
      .save(matchedData(req));

    responseSuccess(res, 'Product created', product);
  } catch (error) {
    responseError(res, 'Failed to create product', `${error}`, 500);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    const product = await dataSource.getRepository(Product).findOneBy({
      id: req.params.id,
    });

    if (!product) {
      responseError(res, 'Product not found', 'Product not found', 404);
      return;
    }

    await dataSource
      .getRepository(Product)
      .update(product.id, matchedData(req));

    responseSuccess(res, 'Product updated', {
      id: product.id,
      ...req.body,
    });
  } catch (error) {
    responseError(res, 'Failed to update product', `${error}`, 500);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    const product = await dataSource.getRepository(Product).findOneBy({
      id: req.params.id,
    });

    if (!product) {
      responseError(res, 'Product not found', 'Product not found', 404);
      return;
    }

    await dataSource.getRepository(Product).update(product.id, {
      active: false,
    });

    responseSuccess(res, 'Product deleted', {
      id: product.id,
    });
  } catch (error) {
    responseError(res, 'Failed to delete product', `${error}`, 500);
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    const product = await dataSource.getRepository(Product).findOneBy({
      id: req.params.id,
    });

    if (!product) {
      responseError(res, 'Product not found', 'Product not found', 404);
      return;
    }

    responseSuccess(res, 'Product found', product);
  } catch (error) {
    responseError(res, 'Failed to retrieve product', `${error}`, 500);
  }
};
