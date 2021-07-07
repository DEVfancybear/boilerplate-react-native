import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import queryString from 'query-string';
import config from '../../config';

export default class APIRequestClient {
  _axios: AxiosInstance;
  constructor() {
    this._axios = axios.create({
      baseURL: config.BASE_URL,
      headers: {
        'content-type': 'application/json',
      },
      paramsSerializer: params => queryString.stringify(params),
    });
  }
  setToken(token: string) {
    this._axios.defaults.headers.common.Authorization = token ? `${token}` : '';
  }
}
