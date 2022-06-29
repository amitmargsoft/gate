import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Anpr } from 'orm/entities/anprs/Anpr';
import { Filter } from 'utils/filter';
import { RedisDB } from 'utils/redisDB';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { TodayDateTime } from 'utils/todayDateTime';
const redisDB = new RedisDB();

const filter = new Filter();
export const add = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  try {
    //store data in variable
    const data = {
      anpr_id: body.id,
      device_id: body.event.groupId,
      //event_timestamp: '1645423207783386',
      event_timestamp: body.event_timestamp,
      match_type: body.event.match_type,
      direction: body.event.direction,
      wait_time: body.event.wait_time,
      make: body.event.make,
      aux_lp: body.event.main_reading,
      det_confidence: body.event.det_confidence,
      confidence: body.event.confidence,
      anpr_video_path: process.env.SERVER_ANPR_URL + body.event.properties.video,
      anpr_image_path: body.event.properties.path.map((value) => process.env.SERVER_ANPR_URL + value),
      db_match: body.event.db_match,
      inserted_at: TodayDateTime(),
      vf_image_path: '',
      vf_video_path: '',
      mine_tags: '',
      other_tags: '',
    };
    console.log('Step-1>',' All data store in variable');

    let vf_img = [];
    if (body.auxInfo && body.auxInfo.images) vf_img = await body.auxInfo.images.map((value) => value.samples);

    data.vf_image_path = [].concat.apply([], vf_img).map((value) => process.env.SERVER_ANPR_URL + value);

    let vf_vid = [];
    if (body.auxInfo && body.auxInfo.videos) vf_vid = await body.auxInfo.videos.map((value) => value.path);

    data.vf_video_path = [].concat.apply([], vf_vid).map((value) => process.env.SERVER_ANPR_URL + value);

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
    const anpr = getRepository(Anpr);
    await anpr.save(data);
    console.log('Step-3>',' Anpr data insert in table');

    //const filterStat = await Filter.filterAnprData(input, read_tags);
    const filterStat: any = await filter.filterAnprData(data);
    console.log('Step-4>',' Anpr data send for mineral deduction');

    res.customSuccess(200, filterStat);
    console.log('Step-5:',' Success');
  } catch (err) {
    console.log(err);
    const customError = new CustomError(400, 'Raw', `User  can't be created`, null, err);
    return next(customError);
  }
};
