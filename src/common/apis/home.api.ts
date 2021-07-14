import unAuthorizedRequest from '../../services/api-service/unAuthorizedRequest';

class HomeApi {
  fetchData = (page: number, size: number): Promise<any> => {
    return unAuthorizedRequest
      .get(`data?_page=${page}&_limit=${size}`)
      .then(res => res.data);
  };
  createData = (text: string): any => {
    const body = {
      full_name: text,
    };
    return unAuthorizedRequest.post('data', body).then(res => res.data);
  };

  getDetail = (id: number): any => {
    return unAuthorizedRequest.get(`data/${id}`).then(res => res.data);
  };
  deleteItem = (id: number): any => {
    return unAuthorizedRequest.delete(`data/${id}`).then(res => res.data);
  };
  updateItem = (updates: any): any => {
    return unAuthorizedRequest.put(`data/${updates.id}`, updates).then(res => res.data);
  };
}

export default new HomeApi();
