
import { getRepository } from 'typeorm';

import { Cases } from 'orm/entities/cases/Cases';
import { RedisDB } from 'utils/redisDB';

import { MineralDetect } from './MineralDetect';

const randomNum = require('utils/random');

const redisDB = new RedisDB();



export class Manipulate {
  public mineral;
  constructor() {
    this.mineral = new MineralDetect();
    this.mineral.processData();
  }

  async manipulateData(data) {
    try {

      const rand = await randomNum.getCaseId();

      const case_id = process.env.GATE_ID.substring(0, 4) + data.gate_no + rand;
      console.log('Step-4.1>', ' Generate case id');
      const redisKey1 = `AllMineTags`;
      const redisKey2 = `AllOtherTags`;

      const redisRfidStat: any = await redisDB.getAllRedisTag(redisKey1, redisKey2, data.timestamp);
      console.log('Step-4.2>', ' Filter rf tags');

      console.log('log all tags ', redisRfidStat);

      const tag = { mine_tags: [], other_tags: [], tag_number: '', vehicle_no: '' };

      if (redisRfidStat.status) {
        tag.mine_tags = redisRfidStat.tag_number;
        tag.other_tags = redisRfidStat.other_tags;
        console.log('Step-4.3>', ' Set match tags');
      }

      let isTagRead = 'N';

      if (tag.mine_tags) isTagRead = 'Y';

      if (tag.other_tags) isTagRead = 'Y';

      const manipulatedData = {
        ...data,
        case_id: case_id,
        gate_id: data.gate_id,
        tag_read_flag: isTagRead,
        tag_number: tag.mine_tags ? tag.mine_tags : '',
        other_tag: tag.other_tags ? tag.other_tags : '',
      };
      console.log('Step-4.4>', ' Prepare again data with tags ');

      const caseDB = getRepository(Cases);
      await caseDB.save(manipulatedData);

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
      this.mineral.addInAIQueue(manipulatedData);
      console.log('Step-4.5>', ' Data added in queue for mineral deduction ');

      //this.mineral.sendRequestForClassification(manipulatedData);
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
