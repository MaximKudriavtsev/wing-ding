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

  getAuthorizedUser: () => {
    return api.post(`${USER_BASE_URL}/profile/get`);
  },

  getUser: id => {
    return api.post(`${USER_BASE_URL}/get/${id}`);
  },

  getUserEvents: id => {
    return api.post(`${USER_BASE_URL}/get/${id}/events`);
  },

  getFriendsList: id => {
    return api.post(`${USER_BASE_URL}/get/${id}/friends`);
  },

  addToFriends: id => {
    return api.post(`${USER_BASE_URL}/friends/add/${id}`);
  },

  deleteFromFriends: id => {
    return api.post(`${USER_BASE_URL}/friends/delete/${id}`);
  },
};
