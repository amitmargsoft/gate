import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Anpr } from 'orm/entities/anprs/Anpr';
import { Filter } from 'utils/filter';
import { RedisDB } from 'utils/redisDB';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { TodayDateTime } from 'utils/todayDateTime';
const redisDB = new RedisDB();

//const filter = new Filter();
export const add = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  try {
    //store data in variable
    const data = {
      timestamp: body.id,
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
      vf_image_path: body.vf_image_path,
      vf_video_path: body.vf_video_path,
      anpr_image_path: body.anpr_image_path,
      anpr_video_path: body.anpr_video_path,
      services: body.services,
    };
    console.log('Step-1> Data received from API');

    /* Delay for N seconds */
    // console.log('Step-2>',' Filter tag in stored data in redis');
    // const redisRfidStat: any = await redisDB.getAllRedisTag(
    //   'AllMineTags',
    //   'AllOtherTags',
    //   TodayDateTime(),
    //   data.inserted_at,
    // );

    // console.log('ALL TAGS ARE HERE ', redisRfidStat);

    // const read_tags = {};

    // if (redisRfidStat.status) {
    //   data.mine_tags = redisRfidStat.tag_number;
    //   data.other_tags = redisRfidStat.other_tags;
    // }

    //console.log(data);
    // const anpr = getRepository(Anpr);
    // await anpr.save(data);
    // console.log('Step-3> Anpr data insert in table');

    // //const filterStat = await Filter.filterAnprData(input, read_tags);
    // const filterStat: any = await filter.filterAnprData(data);
    // console.log('Step-4>  Anpr data send for mineral deduction');

    // res.customSuccess(200, filterStat);
    console.log('Step-5: Success');
  } catch (err) {
    console.log(err);
    const customError = new CustomError(400, 'Raw', `User  can't be created`, null, err);
    return next(customError);
  }
};
