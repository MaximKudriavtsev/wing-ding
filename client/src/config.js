import MockApi from './api/mock';
import HttpApi from './api/production';

export const api = process.env.SERVER_CONFIG === 'real' ? HttpApi : MockApi;
export const BASE_URL = 'http://46.161.49.178';
export const TOKEN_PROP = 'access_token';
