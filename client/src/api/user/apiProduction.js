import { api } from './../../utils';
const USER_BASE_URL = '/user';

export const userApi = {
  auth: ({ login, password }) => {
    return api.post(`${USER_BASE_URL}/auth`, { login, password });
  },

  registration: ({ login, email, password }) => {
    return api.post(`${USER_BASE_URL}/registration`, { login, email, password });
  },
};
