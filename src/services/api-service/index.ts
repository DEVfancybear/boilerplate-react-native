import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import queryString from 'query-string';

export default class APIRequestClient {
  protected _axios: AxiosInstance;
  constructor() {
    this._axios = axios.create({
      baseURL: 'localhost://',
      headers: {
        'content-type': 'application/json',
      },
      paramsSerializer: params => queryString.stringify(params),
    });
  }
  setToken(token: string) {
    this._axios.defaults.headers.common.Authorization = token ? `${token}` : '';
  }
  get(url: string, config?: AxiosRequestConfig) {
    return this._axios.get(url, config);
  }
}
