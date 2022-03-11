const redis = require('redis');

// import { Rfid } from 'orm/entities/rfid/Rfid';

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_URL = process.env.REDIS_URL || '127.0.0.1';

export class RedisDB {
  public redisdb;
  constructor() {
    this.redisdb = redis.createClient(REDIS_PORT);
    this.redisdb.on('error', (err) => {
      console.log('Redis Error ' + err);
    });
    this.redisdb.on('error', (err) => console.log('Redis Client Error', err));
    this.redisdb.connect();

    this.test();
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
          const item = val;

          const time = Number(item.time);
          console.log(`rfid => start timestamp : ${start} tag timestamp : ${time} end timestamp : ${end}`);
          console.log(
            `rfid => start time : ${new Date(start)} tag time : ${new Date(time)} end time : ${new Date(end)}`,
          );
          if (!(start <= time && time <= end)) {
            isRemoved.push(val.tag);
            //const stat = await this.deleteData(redisKey, val);
           // console.log(`tag removed successfully with status: ${stat} tag: ${JSON.stringify(val)}`);
          } else {
            isExist.push(val.tag);
          }
        }

        const newData = await this.getData(redisKey);

        resolve({
          status: true,
          data: newData,
          all_tag: isExist,
          remove_tag: isRemoved,
        });
      } catch (error) {
        console.log(error);
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
  async getAllRedisTag(mineTagKey, otherTagKey, timestamp) {
    return new Promise(async (resolve) => {
      try {
        const mineTags = await this.getData(mineTagKey);
        const otherTags = await this.getData(otherTagKey);
      
        const mineFilterTags = await this.filterTags(mineTags, mineTagKey, timestamp);
        const otherFilterTags = await this.filterTags(otherTags, otherTagKey, timestamp);

        // const mineTags = mineFilterTags.data.map((dat) => dat.tag);
        // const otherTags = otherFilterTags.data.map((dat) => dat.tag);

        // const allTag = [...mineFilterTags.all_tag, ...otherFilterTags.all_tag];
        // const removeTag = [...mineFilterTags.remove_tag, ...otherFilterTags.remove_tag];

        // Rfid.save({
        //   case_id: case_id,
        //   tag_send: allTag.join(', '),
        //   tag_removed: removeTag.join(', '),
        //   inserted_at: new Date(),
        // });

        // const uniqueMineTags = [...new Set(mineTags)];
        // const uniqueOtherTags = [...new Set(otherTags)];

        // const csvMineTags = uniqueMineTags.join(', ');
        // const csvOtherTags = uniqueOtherTags.join(', ');

        resolve({
          status: true,
          tag_number: [], //csvMineTags,
          other_tags: [], //csvOtherTags,
        });
      } catch (error) {
        console.log(error);
        resolve({
          status: false,
        });
      }
    });
  }
}
