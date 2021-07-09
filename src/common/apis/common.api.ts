import unAuthorizedRequest from '../../services/api-service/unAuthorizedRequest';

class CommonApi {
  fetchData = (url: string) => {
    return unAuthorizedRequest.get(url);
  };
}

export default new CommonApi();
