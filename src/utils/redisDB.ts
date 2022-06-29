import { getRepository } from 'typeorm';

import { Rfid } from 'orm/entities/rfid/Rfid';

const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_URL = process.env.REDIS_URL || '127.0.0.1';

export class RedisDB {
  public redisdb;
  public rfid;
  constructor() {
    this.redisdb = redis.createClient(REDIS_PORT);
    this.redisdb.on('error', (err) => {
      console.log('Redis Error ' + err);
    });
    this.redisdb.on('error', (err) => console.log('Redis Client Error', err));
    this.redisdb.connect();

    this.test();
    //this.rfid = getRepository(Rfid);
  }

  async test() {
    //  this.redisdb.SADD('AllMineTags',"[]");
    // const dat = await this.redisdb.SMEMBERS('AllMineTags');
    // console.log(dat);
  }

  async getData(redisKey) {
    return new Promise(async (resolve) => {
      try {
        const data = await this.redisdb.SMEMBERS(redisKey);
        resolve(data);
      } catch (error) {
        console.log({ error });
        resolve([]);
      }
    });
  }

  async setData(redisKey, data) {
    return new Promise(async (resolve) => {
      try {
        const availableTags: any = await this.getData(redisKey);
        if (availableTags) {
          await this.redisdb.SADD(redisKey, JSON.stringify(data));
        }
        resolve(true);
      } catch (error) {
        console.error(error);
        resolve(false);
      }
    });
  }

  async deleteData(redisKey, data) {
    return new Promise(async (resolve) => {
      try {
        console.log('Data Sanitized');
        const availableTags = await this.getData(redisKey);
        if (availableTags) await this.redisdb.set(redisKey, data);

        resolve(true);
      } catch (error) {
        console.error(error);
        resolve(false);
      }
    });
  }

  async checkMineTags(epc, value) {
    return new Promise(async (resolve) => {
      console.log('Checking EPC value of the tag : ', {
        epc,
        value,
      });
      try {
        const mineTagsFilter = epc ? epc.substring(0, 7) : 'not available';
        console.log('Substring of EPC value : ', mineTagsFilter);
        if (mineTagsFilter == 'E200118') {
          resolve({
            isMineTag: true,
            tag: value,
          });
        } else {
          resolve({
            isMineTag: false,
            tag: value,
          });
        }
      } catch (error) {
        console.log(error);
        resolve({
          isMineTag: false,
          tag: value,
        });
      }
    });
  }

  async filterTags(data, redisKey, timestamp) {
    return new Promise(async (resolve) => {
      try {
        const anprTime = timestamp ? timestamp : Date.now();
        const d = Number(anprTime);
        const start = d - Number(process.env.MATCHING_MILLISECOND_START_TIME);
        const end = d + Number(process.env.MATCHING_MILLISECOND_END_TIME);

        const isRemoved = [];
        const isExist = [];

        for (const val of data) {
          const item: any = JSON.parse(val);

          const time = Number(item.time);
          //console.log(`${redisKey} => start timestamp : ${start} tag timestamp : ${time} end timestamp : ${end}`);
          console.log({ t: time, s: start, e: end, g: item.tag });

          if (!(start <= time && end >= time)) {
            isRemoved.push(item.tag);
            //const stat = await this.deleteData(redisKey, val);
            // console.log(`tag removed successfully with status: ${stat} tag: ${JSON.stringify(val)}`);
          } else {
            isExist.push(item.tag);
          }
        }
        console.log('Loop end data tags filtered success');

        const newData = await this.getData(redisKey);

        resolve({
          status: true,
          data: newData,
          all_filter_tag: isExist,
          remove_tag: isRemoved,
        });
      } catch (error) {
        console.error('Error>', error);
        resolve({
          status: false,
          data: [],
          all_tag: '',
          remove_tag: '',
        });
      }
    });
  }

  async setRedisTags(redisKey1, redisKey2, value, epc, time) {
    return new Promise(async (resolve) => {
      const tagCheck = await this.checkMineTags(epc, value);
      if (!tagCheck) {
        console.log('Setting value in Redis key ==> ', redisKey2);
        const setKey2 = await this.setData(redisKey2, {
          tag: value,
          time: time,
        });
        resolve(setKey2);
      }
      if (tagCheck) {
        console.log('Setting value in Redis key ==> ', redisKey1);
        const setKey1 = await this.setData(redisKey1, {
          tag: value,
          time: time,
        });
        resolve(setKey1);
      }
    });
  }
  async getAllRedisTag(mineTagKey, otherTagKey, case_id, timestamp) {
    return new Promise(async (resolve) => {
      try {
        const mineTags: any = await this.getData(mineTagKey);
        const otherTags = await this.getData(otherTagKey);

        const mineFilterTags: any = await this.filterTags(mineTags, mineTagKey, timestamp);
        const otherFilterTags: any = await this.filterTags(otherTags, otherTagKey, timestamp);

        const rawMineTags = mineFilterTags.all_filter_tag.map((dat) => dat);
        const rawOtherTags = otherFilterTags.data.map((dat) => dat);

        // this.rfid.save({
        //   // case_id: case_id,
        //   tag_send: allTag.join(', '),
        //   tag_removed: removeTag.join(', '),
        //   inserted_at: new Date(),
        // });

        const uniqueMineTags = [...new Set(rawMineTags)];
        const uniqueOtherTags = [...new Set(rawOtherTags)];

        const csvMineTags = uniqueMineTags.join(', ');
        const csvOtherTags = uniqueOtherTags.join(', ');

        resolve({
          status: true,
          tag_number: csvMineTags,
          other_tags: csvOtherTags,
        });
      } catch (error) {
        console.log('Error:', error);
        resolve({
          status: false,
          tag_number: [],
          other_tags: [],
        });
      }
    });
  }
}
