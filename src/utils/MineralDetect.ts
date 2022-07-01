import { Job } from 'bull';
import Queue from 'bull';

import { AxiosRequest } from './AxiosRequest';
import { SendPackateData } from './SendPackateData';

const mineralQueue = new Queue(process.env.AI_QUEUE_NAME);
const webDSSQueue = new Queue(process.env.WEB_DSS_QUEUE_NAME);

const { exec } = require('child_process');

export class MineralDetect {
  public client: any;
  public mineralQueue;
  public webDSSQueue;
  public axiosSendRequest: AxiosRequest;
  public sendPackateData: SendPackateData;
  constructor() {
    this.mineralQueue = mineralQueue;
    this.webDSSQueue = webDSSQueue;
    this.axiosSendRequest = new AxiosRequest();
    this.sendPackateData = new SendPackateData();
  }

  // sendRequestForClassification(input) {
  //   return new Promise((resolve, reject) => {
  //     let vf_img = input.vf_image_path.map((value: string) =>
  //       value.replace(process.env.SERVER_ANPR_URL, process.env.LOCATION_ANPR_IMAGE_PATH),
  //     );


  //     const data = JSON.stringify({
  //       case_id: input.case_id,
  //       vf_image_path: vf_img,
  //     });

  //     const config = {
  //       method: 'post',
  //       url: process.env.AI_URL,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       data: data,
  //     };

  //     this.axiosSendRequest
  //       .sendRequest(config)
  //       .then(function (response: any) {
  //         console.log('Step-4.7.1>', ' Deduction Repsonse find');

  //         console.log('Response Data ##', response.data);
  //         const ai_resp_data = response.data.prediction;

  //         resolve({
  //           status: true,
  //           data: {
  //             case_id: response.data.case_id,
  //             mineral_type: ai_resp_data.mineral_type,
  //             mineral_type_confidence: ai_resp_data.confidence,
  //             loaded: ai_resp_data.is_empty == 'False' ? true : false,
  //             loaded_confidence: ai_resp_data.confidence,
  //             covered: (ai_resp_data.is_covered = 'False') ? false : true,
  //             covered_confidence: ai_resp_data.covered_confidence,
  //             overloading: null,
  //             overloading_confidence: 0,
  //             height: null,
  //             mineral_volume: null,
  //             mineral_volume_confidence: 0,
  //           },
  //         });
  //       })
  //       .catch(function (error: any) {
  //         console.log('costumerErro', error.message);
  //         if (error.code === 'ECONNREFUSED') {
  //           exec(process.env.CMD_SHELL_COMMOND, (error: { message: any }, stdout: any, stderr: any) => {
  //             if (error) {
  //               console.log(`error: ${error.message}`);
  //               return;
  //             }
  //             if (stderr) {
  //               console.log(`stderr: ${stderr}`);
  //               return;
  //             }
  //           });
  //         }
  //         setTimeout(() => {
  //           console.log('Yes');
  //           resolve({
  //             status: false,
  //             data: {},
  //           });
  //         }, 3000);
  //       });
  //   });
  // }

  async processData() {
    this.mineralQueue.process(async (job: Job) => {

      const filterData = job.data;

      // const AiResp: any = await this.sendRequestForClassification({
      //   case_id: job.data.case_id,
      //   vf_image_path: job.data.vf_image_path,
      // });


      //1. Job Queue Option
      const queue_options = {
        priority: 1,
        delay: 9000,
        removeOnComplete: true,
        backoff: 1000 * 10,
        attempts: 15,
        lifo: true,
      };

      //2. Adding a Job to the Queue
      await webDSSQueue.add(filterData, queue_options);

      const reqSendStatus = await this.sendPackateData.makeFilterDataPostRequest(filterData);
      console.log('Step-4.4.1>', ' Process added in queue');

      if (reqSendStatus.status) {
        filterData.retry_flag = false;
        //insert data in gate_filter_data wit flage false it's mease retry
        const isUpdated = []; //await Filter.setFilterData(filterData);
        return Promise.resolve({
          ...isUpdated,
        });
      } else {
        filterData.retry_flag = true;
        //insert data in gate_filter_data and pop from queue
        const isUpdated = []; //await Filter.setFilterData(filterData);
        return Promise.resolve({
          ...isUpdated,
        });
      }
    });

    return new Promise((resolve, rejects) => {
      return resolve({
        status: false,
        message: 'Please try again',
      });
    });
  }

  addInAIQueue(data: any) {
    this.mineralQueue.add(data, {
      attempts: 5,
      delay: 9000,
    });
  }
}
