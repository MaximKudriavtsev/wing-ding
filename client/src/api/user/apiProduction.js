import { api } from './../../utils';
const USER_BASE_URL = '/user';

export const userApi = {
  auth: ({ email, password }) => {
    return api.post(`${USER_BASE_URL}/auth`, { email, password });
  },

  registration: ({ email, password, firstName, lastName }) => {
    return api.post(`${USER_BASE_URL}/registration`, {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
  },

  getUser: () => {
    return api.post(`${USER_BASE_URL}/profile/get`);
  },
};
