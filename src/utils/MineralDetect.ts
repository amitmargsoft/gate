import { Job } from 'bull';

const express = require('express');

import { AxiosRequest } from './AxiosRequest';

import { createBullBoard } from 'bull-board';

import Queue from 'bull';
import { BullAdapter } from 'bull-board/bullAdapter';

const mineralQueue = new Queue('mineralQueue');
const { router, setQueues } = createBullBoard([new BullAdapter(mineralQueue)]);

const app = express();

app.use('admin/queues', router);

const { exec } = require('child_process');



export class MineralDetect {
  public client: any;
  public mineralQueue;
  public axiosSendRequest;
  constructor() {
    this.mineralQueue = mineralQueue;
    this.axiosSendRequest = new AxiosRequest();
  }

  sendRequestForClassification(input: { case_id: any; vf_image_path: any }) {
    return new Promise((resolve, reject) => {
      resolve({
        status: true,
        data: {
          case_id: input.case_id,
          mineral_type: '',
          mineral_type_confidence: 'X',
          loaded: false,
          loaded_confidence: 'X',
          covered: true,
          covered_confidence: 'X',
          overloading: null,
          overloading_confidence: 0,
          height: null,
          mineral_volume: null,
          mineral_volume_confidence: 0,
        },
      });

      let vf_img = input.vf_image_path.map((value: string) =>
        value.replace(process.env.SERVER_ANPR_URL, process.env.LOCATION_ANPR_IMAGE_PATH),
      );

      vf_img = vf_img.slice(1, -1);

      const data = JSON.stringify({
        case_id: input.case_id,
        vf_image_path: vf_img,
      });

      console.log({
        case_id: input.case_id,
        vf_image_path: vf_img,
      });

      const config = {
        method: 'post',
        url: process.env.AI_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      console.log('sending data for AI classification');

      this.axiosSendRequest
        .AxiosRequest(config)
        .then(function (response: { data: { case_id: any }[] }) {
          console.log(JSON.stringify(response.data));
          return;
          // const ai_resp_data = response.data[0].prediction;
          // resolve({
          //   status: true,
          //   data: {
          //     case_id: response.data[0].case_id,
          //     mineral_type: ai_resp_data.mineral_type,
          //     mineral_type_confidence: ai_resp_data.confidence,
          //     loaded: ai_resp_data.is_empty == 'False' ? true : false,
          //     loaded_confidence: ai_resp_data.confidence,
          //     covered: (ai_resp_data.is_covered = 'False') ? false : true,
          //     covered_confidence: ai_resp_data.covered_confidence,
          //     overloading: null,
          //     overloading_confidence: 0,
          //     height: null,
          //     mineral_volume: null,
          //     mineral_volume_confidence: 0,
          //   },
          // });
        })
        .catch(function (error: { code: string }) {
          console.log(error.code);
          if (error.code === 'ECONNREFUSED') {
            exec(process.env.CMD_SHELL_COMMOND, (error: { message: any }, stdout: any, stderr: any) => {
              if (error) {
                console.log(`error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
              }
            });
          }
          setTimeout(() => {
            reject({
              status: false,
              data: {},
            });
          }, 3000);
        });
    });
  }

  processData() {
    this.mineralQueue.process(async (job: Job) => {
      console.log('anpr queue is in progress', {
        case_id: job.data.case_id,
        vf_image_path: job.data.vf_image_path,
      });

      const AiResp = await this.sendRequestForClassification({
        case_id: job.data.case_id,
        vf_image_path: job.data.vf_image_path,
      });

      // if (!AiResp.status) {
      //   return Promise.reject({
      //     ...AiResp,
      //   });
      // }

      // const filterData = {
      //   ...job.data,
      //   ...AiResp.data,
      // };
      return new Promise((resolve, rejects) => {
        return resolve({
          status: false,
          message: 'Please try again',
        });
      });
    });
  }

  addInQueue(data: any) {
    this.mineralQueue.add(data, {
      attempts: 5,
    });
  }
}
