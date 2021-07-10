import {AxiosResponse} from 'axios';
import unAuthorizedRequest from '../../services/api-service/unAuthorizedRequest';

class HomeApi {
  fetchData = (page: number, size: number): Promise<any> => {
    return unAuthorizedRequest
      .get(`data?_page=${page}&_limit=${size}`)
      .then(res => res);
  };
  createData = (text: string): any => {
    const body = {
      full_name: text,
    };
    return unAuthorizedRequest.post('data', body).then(res => res.data);
  };

  getDetail = (id: number) : any => {
    return unAuthorizedRequest.post(`data/${id}`).then(res => res.data);
  }
}

export default new HomeApi();
