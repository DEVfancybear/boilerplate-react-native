import queryString from 'query-string';
import config from '../../config';
import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import _ from 'lodash';
import {APIServiceType, IAPIService} from './IAPIService';
import {APP_SCREEN} from '../../routes/screenTypes';
import {NavigationService} from '../navigation-service/navigationService';

export const SERVICE_REQUEST_TIMEOUT = 80000;

/**
 * API Service that called from axios with no protection ssl pining
 */
class AxiosAPIService implements IAPIService {
  baseURL: string = config.BASE_URL;

  type: APIServiceType = 'axios';

  axios: AxiosInstance = Axios.create({timeout: SERVICE_REQUEST_TIMEOUT});

  responseInterceptor?: number;

  constructor(baseURL: string = config.BASE_URL) {
    this.baseURL = baseURL;
    this.createInstance(baseURL);
  }

  /**
   * Return an axios instance with default configs.
   * @param baseURL baseURL.
   */
  createInstance = (baseURL: string = config.BASE_URL): AxiosInstance => {
    const config: AxiosRequestConfig = {};

    if (baseURL) {
      config.baseURL = baseURL;
    }
    config.headers = this.defaultHeaders;
    config.timeout = SERVICE_REQUEST_TIMEOUT;
    config.paramsSerializer = params => queryString.stringify(params);
    const instance = Axios.create(config);

    // Add response interceptor for token timeout or service offline
    this.responseInterceptor = instance.interceptors.response.use(
      response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // loggingService.logAxiosResponse(response)
        return response;
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error && error.response) {
          if (error.response.status === 401) {
            if (error.response.data) {
              error.message = this.parseErrors(error.response.data);
            }
            this.handleUnauthorized();
          } else if (error.response.data) {
            error.message = this.parseErrors(error.response.data);
          }
        } else if (error && error.request) {
          // Handle request timeout
          if (
            error.request.status === 0 &&
            _.isString(error.request._response)
          ) {
            error.message = error.request._response;
          }
        }
        // Log data to firebase.
        if (error) {
          // const requestConfig = _.get(error, ['response', 'config'], {})
          // const response = _.get(error, ['response'], {})
          // loggingService.logAxiosError(error.message, requestConfig, response)
        }
        return Promise.reject(error);
      },
    );
    instance.defaults.timeout = SERVICE_REQUEST_TIMEOUT;
    this.axios = instance;
    return instance;
  };

  /**
   * Return a object value which describes the HTTP request headers.
   */
  get defaultHeaders() {
    return {};
  }

  /**
   * Set token to headers Authorization
   * @param token token user after login success
   */

  setToken(token: string) {
    this.axios.defaults.headers.common.Authorization = token
      ? `Bearer ${token}`
      : '';
  }

  /**
   * Perform a GET request.
   * @param url path of the request.
   * @param config http request config.
   */
  get(url: string, config?: any) {
    return this.axios.get(url, {
      headers: this.defaultHeaders,
      ...config,
    });
  }

  /**
   * Perform a POST request.
   * @param url path of the request.
   * @param data json or form-data request body.
   * @param config http request config.
   */
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, {
      headers: this.defaultHeaders,
      ...config,
    });
  }

  /**
   * Perform a PUT request.
   * @param url path of the request
   * @param data json or form-data request body
   * @param config http request config.
   */
  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, {
      headers: this.defaultHeaders,
      ...config,
    });
  }

  /**
   * Perform a DELETE request.
   * @param url path of the request
   * @param config http request config.
   */
  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, {
      headers: this.defaultHeaders,
      ...config,
    });
  }

  /**
   * Perform a PATCH request.
   * @param url path of the request.
   * @param data json or form-data request body.
   * @param config http request config.
   */
  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.patch(url, data, {
      headers: this.defaultHeaders,
      ...config,
    });
  }

  /**
   * Return a string value which combines an errors.
   * @param errorData errorData.
   */
  parseErrors = (errorData: any): string => {
    return errorData.message && _.isString(errorData.message)
      ? errorData.message
      : '';
  };

  /**
   * Handle unauthorized flow.
   */
  async handleUnauthorized(): Promise<void> {
    NavigationService.navigate(APP_SCREEN.REGISTER);
  }
}

// Uncomment this line if you use Axios.

export default AxiosAPIService;
