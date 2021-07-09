import authorizedRequest from '../../services/api-service/authorizedRequest';

class AuthApi {
  setToken = (token: string) => {
    authorizedRequest.setToken(token);
  };
}

export default new AuthApi();
