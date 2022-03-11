import axios from 'axios';

export class AxiosRequest {
  public client;

  sendRequest(data: any) {
    return axios(data);
  }
}
