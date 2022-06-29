import { RedisDB } from 'utils/redisDB';

import { MineralDetect } from './MineralDetect';

const randomNum = require('utils/random');

const redisDB = new RedisDB();

export class Filter {
  public mineral;
  constructor() {
    this.mineral = new MineralDetect();
    this.mineral.processData();
  }

  async filterAnprData(data) {
    try {
      const rand = await randomNum.getCaseId();

      const case_id = process.env.GATE_ID.substring(0, 4) + data.gate_no + rand;
      console.log('Step-4.1>', ' Generate case id');
      const redisKey1 = `AllMineTags`;
      const redisKey2 = `AllOtherTags`;

      const redisRfidStat: any = await redisDB.getAllRedisTag(redisKey1, redisKey2, case_id, data.event_timestamp);
      console.log('Step-4.2>', ' Filter rf tags');

      console.log('log all tags ', redisRfidStat);

      const tag = { mine_tags: [], other_tags: [], tag_number: '', vehicle_no: '' };

      console.log('Filter Mine tag by amit', redisRfidStat);
      if (redisRfidStat.status) {
        tag.mine_tags = redisRfidStat.tag_number;
        tag.other_tags = redisRfidStat.other_tags;
        console.log('Step-4.3>', ' Set match tags');
      }

      let isTagRead = 'N';

      if (tag.mine_tags) isTagRead = 'Y';

      if (tag.other_tags) isTagRead = 'Y';

      console.log('**** TAG NUMBER ****', tag);

      const filterData = {
        case_id: case_id,
        gate_id: data.gate_id,
        timestamp: data.event_timestamp,
        tag_read_flag: isTagRead,
        tag_number: tag.mine_tags ? tag.mine_tags : '',
        other_tag: tag.other_tags ? tag.other_tags : '',
        vehicle_read_flag: 'Y',
        vehicle_no: data.reading,
        vehicle_type_read_flag: 'Y',
        vehicle_type: data.type,
        vehicle_height_ft: null,
        anpr_image_path: data.anpr_image_path,
        anpr_video_path: data.anpr_video_path,
        mineral_type: null,
        loaded: null,
        height: null,
        mineral_volume: null,
        create_date: new Date(),
        create_by: process.env.GATE_ID,
        update_date: new Date(),
        update_by: process.env.GATE_ID,
        vf_image_path: data.vf_image_path,
        vf_video_path: data.vf_video_path,
      };
      console.log('Step-4.4>', ' Prepare again data with tags ');

      // if (tag.vehicle_no != 'null' || tag.vehicle_no != null) {
      //   tag.vehicle_no = 'null';
      // }

      const vf_img = [];

      // if (data.auxInfo && data.auxInfo.images) vf_img = await data.auxInfo.images.map((value) => value.samples);

      // filterData.vf_image_path = []; //[].concat.apply([], vf_img).map(value => anpr_conf.anpr_url + value.path);

      // let vf_vid = [];
      // if (data.auxInfo && data.auxInfo.videos) vf_vid = await data.auxInfo.videos.map((value) => value.path);

      // filterData.vf_video_path = [];//[].concat.apply([], vf_vid).map((value) => process.env.SERVER_ANPR_URL + value);

      //1. Job Queue Option
      const queue_options = {
        priority: 1,
        removeOnComplete: true,
        backoff: 1000 * 10,
        attempts: 7,
        lifo: true,
      };

      //2. Adding a Job to the Queue
      //await sendAIQueue.add(filterData, queue_options);
      this.mineral.addInAIQueue(filterData);
      console.log('Step-4.5>', ' Data added in queue for mineral deduction ');

      this.mineral.sendRequestForClassification(filterData);
      console.log('Step-4.6>', ' Data sent for deduction ');

      return {
        status: true,
        message: 'Get status successfully!!',
      };
    } catch (err) {
      console.log('Post to third or Filter data post failed - ', err);
      return {
        status: false,
        message: 'Insertion and posting failed',
      };
    }
  }
}
