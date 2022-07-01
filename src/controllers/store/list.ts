import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Store } from 'orm/entities/store/Store';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const storeDB = getRepository(Store);
  try {
    const rows = await storeDB.find({});
    res.customSuccess(200, 'List of stored data.', rows);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list.`, null, err);
    return next(customError);
  }
};
