import AxiosAPIService from '.';
import config from '../../config';

const authorizedRequest = new AxiosAPIService(config.BASE_URL);

export default authorizedRequest;
