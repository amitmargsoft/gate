import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Anpr } from 'orm/entities/anprs/Anpr';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const db = getRepository(Anpr);
  try {
    const anprs = await db.find({});
    res.customSuccess(200, 'List of anprs.', anprs);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};
