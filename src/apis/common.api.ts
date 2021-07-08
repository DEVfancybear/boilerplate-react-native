import {apiService} from '../services/api-service';

class CommonApi {
  fetchData = (url: string) => {
    return apiService.get(url);
  };
}

export default new CommonApi();
