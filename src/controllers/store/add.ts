import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Store } from 'orm/entities/store/Store';
import { Manipulate } from 'utils/manipulate';
import { RedisDB } from 'utils/redisDB';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { TodayDateTime } from 'utils/todayDateTime';
const redisDB = new RedisDB();

const manipulate = new Manipulate();
export const add = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  try {
    //store data in variable
    const data = {
      timestamp: Number(body.timestamp),
      vehicle_type: body.vehicle_type,
      vehicle_no: body.vehicle_no,
      mineral_type: body.mineral_type,
      mineral_type_confidence: body.mineral_type_confidence,
      mi_start_time: body.mi_start_time,
      mi_end_time: body.mi_end_time,
      loaded_confidence: body.loaded_confidence,
      overloading: body.overloading,
      overloading_confidence: body.overloading_confidence,
      covered: body.covered,
      covered_confidence: body.covered_confidence,
      lane: body.lane,
      vf_image_path: JSON.stringify(body.vf_image_path),
      vf_video_path: JSON.stringify(body.vf_video_path),
      anpr_image_path: JSON.stringify(body.anpr_image_path),
      anpr_video_path: JSON.stringify(body.anpr_video_path),
      services: JSON.stringify(body.services),
    };
    const storeDB = getRepository(Store);
    await storeDB.save(data);

    const filterStat = await manipulate.manipulateData(data);
    console.log('Step-4>  Anpr data send for mineral deduction');

    res.customSuccess(200, "OK");
    console.log('Step-5: Success');
  } catch (err) {
    console.log(err);
    const customError = new CustomError(400, 'Raw', `Exception `, null, err);
    return next(customError);
  }
};
