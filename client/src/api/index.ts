import env from '../../config';

import MockApi from './mock';
import HttpApi from './production';

export const api = env.SERVER_CONFIG === 'real' ? HttpApi : MockApi;