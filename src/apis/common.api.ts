import unAuthorizedRequest from '../services/api-service/unAuthorizedRequest';

class CommonApi {
  fetchData = (url: string) => {
    return unAuthorizedRequest._axios.get(url);
  };
}

export default new CommonApi();
