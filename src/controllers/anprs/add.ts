import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Anpr } from 'orm/entities/anprs/Anpr';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const add = async (req: Request, res: Response, next: NextFunction) => {
  const { device_id, event_timestamp,match_type,direction,priority,wait_time } = req.body;

  const  db = getRepository(Anpr);
  try {
    const row = await  db.findOne({ where: { email } });

    if (row) {
      const customError = new CustomError(400, 'General', 'row already exists', [
        `Email '' already exists`,
      ]);
      return next(customError);
    }

    try {
      const data = new Anpr();
      data.device_id = device_id;
      data.password = password;
      await  db.save(data);

      res.customSuccess(200, 'User successfully created.');
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `User '${email}' can't be created`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
