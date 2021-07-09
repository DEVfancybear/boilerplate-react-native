import AxiosAPIService from '.';
import config from '../../config';

const unAuthorizedRequest = new AxiosAPIService(config.BASE_URL);

export default unAuthorizedRequest;
