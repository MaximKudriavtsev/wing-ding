import { api } from '../../utils';
import { UserApi } from './types';

const USER_BASE_URL = '/user';

const userApi: UserApi = {
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

  getFriendList: id => {
    return api.post(`${USER_BASE_URL}/get/${id}/friends`);
  },

  addToFriends: id => {
    return api.post(`${USER_BASE_URL}/friends/add/${id}`);
  },

  deleteFromFriends: id => {
    return api.post(`${USER_BASE_URL}/friends/delete/${id}`);
  },

  changeProfile: ({ firstName, lastName, birthDate, description, photo }) => {
    return api.post(`${USER_BASE_URL}/profile/change`, {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      description,
      photo,
    });
  },
};

export default userApi;
