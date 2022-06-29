const axios = require('axios');
//const timerService = require('./timer');
const request = require('request');

export class SendPackateData {

  async postDataFunc1(input: any) {
    return new Promise((resolve) => {
      console.log('===================== SENDING DATA TO MARGSOFT ===========================', input);
      const config = {
        method: 'post',
        url: 'https://checkgates.in/api/v1/add_filterdata',
        headers: {
          'api-token': process.env.UPDSS_WEB_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(input),
      };

      axios(config)
        .then(function (response) {
          console.log('========================== MARGSOFT =============================');
          console.log(JSON.stringify(response.data));
          console.log('========================== MARGSOFT =============================');

          resolve({
            status: true,
            data: {},
          });
        })
        .catch(function (error) {
          console.log(error);
          resolve({
            status: false,
            data: {},
          });
        });
    });
  }

  async postDataFunc2(input: any) {
    return new Promise(async (resolve) => {
      console.log('===================== SENDING DATA TO UPMDSS ===========================', input);

      try {
        const options = {
          method: 'POST',
          url: 'https://upmdss.in/api/checking/iot/get-check-gate-validated-response',
          headers: {
            'ckg-api-key': process.env.MG_ACCESS_TOKEN,
          },
          form: input,
        };
        request(options, function (error, response) {
          if (error) {
            console.log(error);
            resolve({
              status: false,
              data: {},
            });
          } else {
            console.log('=========================== UPMDSS ============================');
            console.log(JSON.stringify(response.body));
            console.log('=========================== UPMDSS ============================');

            resolve({
              status: true,
              data: {},
            });
          }
        });
      } catch (error) {
        console.log(error);
        resolve({
          status: false,
          data: {},
        });
      }
    });
  }

  async makeFilterDataPostRequest(input: any) {
    const stat1: any = await this.postDataFunc1(input);

    if (stat1.status) {
      console.log('third party post data succeeded');

      return {
        status: true,
        message: 'Got Success Response!!',
      };
    } else {
      console.log('third party post data failed');
      //timerService.startPostTimer(1000 * 60 * 15);
      return {
        status: false,
        message: 'Got Failed Response!!',
      };
    }
  }

  async asyncmakeUpmdssFilterDataPostRequest(input: any) {
    const stat1: any = await this.postDataFunc2(input);

    if (stat1.status) {
      console.log('third party post data succeeded UPMDSS');

      return {
        status: true,
        message: 'Got Success Response!!',
      };
    } else {
      console.log('third party post data failed UPMDSS');
      //timerService.startPostTimer(1000 * 60 * 15);
      return {
        status: false,
        message: 'Got Failed Response!!',
      };
    }
  }

  async makeDeviceStatusRequest(input: any) {
    console.log(input);

    const res = await axios.post('http://localhost:3000/users/', input);

    if (!res)
      return {
        status: false,
        message: 'Got Failed Response!!',
      };

    return {
      status: true,
      message: 'Got Success Response!!',
    };
  }
}
