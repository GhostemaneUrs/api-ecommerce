import { Request, Response } from 'express';
import { Quotation } from '../entity/quotation';
import PostgreSQL from '../config/postgresql';
import { matchedData } from 'express-validator';
import { responseError, responseSuccess } from '../utils/response';
import { Product } from '../entity/product';

export const getQuotations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    const quotations = await dataSource.getRepository(Quotation).find({
      where: { active: true },
      relations: {
        user_id: true,
        product_id: true,
      },
    });

    if (!quotations) {
      responseError(res, 'Quotations not found', 'Quotations not found', 404);
      return;
    }

    responseSuccess(
      res,
      'Quotations found',
      quotations.map((q) => {
        return {
          id: q.id,
          active: q.active,
          price: q.price,
          quantity: q.quantity,
          user: q.user_id.first_name + ' ' + q.user_id.last_name,
          product: q.product_id.name,
        };
      })
    );
  } catch (error) {
    responseError(res, 'Failed to retrieve Quotations', `${error}`, 500);
  }
};

export const createQuotation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();

    const product = await dataSource.getRepository(Product).findOneBy({
      id: req.body.productId,
    });

    if (!product) {
      responseError(res, 'Product not found', 'Product not found', 404);
      return;
    }

    const price = product.price * req.body.quantity;

    const quotation = await dataSource.getRepository(Quotation).save({
      ...matchedData(req),
      price,
    });

    responseSuccess(res, 'Quotation created', quotation);
  } catch (error) {
    responseError(res, 'Failed to create quotation', `${error}`, 500);
  }
};

export const updateQuotation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    const quotation = await dataSource.getRepository(Quotation).findOneBy({
      id: req.params.id,
    });

    if (!quotation) {
      responseError(res, 'Quotation not found', 'Quotation not found', 404);
      return;
    }

    const product = await dataSource.getRepository(Product).findOneBy({
      id: req.body.productId,
    });

    if (!product) {
      responseError(res, 'Product not found', 'Product not found', 404);
      return;
    }

    const price = product.price * req.body.quantity;

    await dataSource.getRepository(Quotation).update(quotation.id, {
      ...matchedData(req),
      price,
    });

    responseSuccess(res, 'Quotation updated', {
      id: quotation.id,
      ...req.body,
    });
  } catch (error) {
    responseError(res, 'Failed to update product', `${error}`, 500);
  }
};

export const deleteQuotation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    const quotation = await dataSource.getRepository(Quotation).findOneBy({
      id: req.params.id,
    });

    if (!quotation) {
      responseError(res, 'Quotation not found', 'Quotation not found', 404);
      return;
    }

    await dataSource.getRepository(Quotation).update(quotation.id, {
      active: false,
    });

    responseSuccess(res, 'Quotation deleted', {
      id: quotation.id,
    });
  } catch (error) {
    responseError(res, 'Failed to delete product', `${error}`, 500);
  }
};

export const getQuotationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    const quotation = await dataSource.getRepository(Quotation).findOne({
      where: { id: req.params.id },
      relations: {
        user_id: true,
        product_id: true,
      },
    });

    if (!quotation) {
      responseError(res, 'Quotation not found', 'Quotation not found', 404);
      return;
    }

    console.log({
      id: quotation.id,
      active: quotation.active,
      price: quotation.price,
      quantity: quotation.quantity,
      user_id: {
        value: quotation.user_id.id,
        label: quotation.user_id.first_name + ' ' + quotation.user_id.last_name,
      },
      product_id: {
        label: quotation.product_id.name,
        value: quotation.product_id.id,
        price: quotation.product_id.price,
        stock: quotation.product_id.stock,
        image: quotation.product_id.image,
      },
    });

    responseSuccess(res, 'Quotation found', {
      id: quotation.id,
      active: quotation.active,
      quantity: Number(quotation.quantity),
      user_id: {
        value: quotation.user_id.id,
        label: quotation.user_id.first_name + ' ' + quotation.user_id.last_name,
      },
      product_id: {
        label: quotation.product_id.name,
        value: quotation.product_id.id,
        price: quotation.product_id.price,
        stock: quotation.product_id.stock,
        image: quotation.product_id.image,
      },
    });
  } catch (error) {
    responseError(res, 'Failed to retrieve Quotation', `${error}`, 500);
  }
};
