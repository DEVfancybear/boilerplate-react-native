import {AxiosResponse} from 'axios';
import unAuthorizedRequest from '../../services/api-service/unAuthorizedRequest';

class HomeApi {
  fetchData = (page: number, size: number): Promise<AxiosResponse<any>> => {
    return unAuthorizedRequest
      .get(`video/list?page=${page}&page_size=${size}`)
      .then(res => res.data);
  };
}

export default new HomeApi();
