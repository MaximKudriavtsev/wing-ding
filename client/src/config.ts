import env from '../config';

import MockApi from './api/mock';
import HttpApi from './api/production';

export const api = env.SERVER_CONFIG === 'real' ? HttpApi : MockApi;
export const TOKEN_PROP = 'accessToken';
