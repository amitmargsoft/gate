import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Tags } from 'orm/entities/tags/Tags';
import { RedisDB } from 'utils/redisDB';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { TodayDateTime } from 'utils/todayDateTime';
const redisDB = new RedisDB();

export const add = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  try {
    //store data in variable
    const data = {
      tid: body.tag_number,
      tag_epc: body.EPC96,
      timestamp: body.lastSeenTimestampUTC,
      inserted_at: TodayDateTime(),
    };
    const redisKey2 = `AllMineTags`;
    const redisKey3 = `AllOtherTags`;
    const redisRfidStat = await redisDB.setRedisTags(redisKey2, redisKey3, data.tid, data.tag_epc, data.timestamp);
    console.log('Setting RFID tags to redis', redisRfidStat);

    console.log(data);
    const tagsDB = getRepository(Tags);
    await tagsDB.save(data);
    console.log('Inserted');

    res.customSuccess(200, 'User successfully created.');
  } catch (err) {
    console.log(err);
    const customError = new CustomError(400, 'Raw', `User  can't be created`, null, err);
    return next(customError);
  }
};
