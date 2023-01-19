import { apiQuery } from '../query';
import { UserApi } from './types';

const USER_BASE_URL = '/user';

const userApi: UserApi = {
  auth: ({ email, password }) => {
    return apiQuery.post(`${USER_BASE_URL}/auth`, { email, password });
  },

  registration: ({ email, password, firstName, lastName }) => {
    return apiQuery.post(`${USER_BASE_URL}/registration`, {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
  },

  getAuthorizedUser: () => {
    return apiQuery.post(`${USER_BASE_URL}/profile/get`);
  },

  getUser: id => {
    return apiQuery.post(`${USER_BASE_URL}/get/${id}`);
  },

  getUserEvents: id => {
    return apiQuery.post(`${USER_BASE_URL}/get/${id}/events`);
  },

  getFriendList: id => {
    return apiQuery.post(`${USER_BASE_URL}/get/${id}/friends`);
  },

  addToFriends: id => {
    return apiQuery.post(`${USER_BASE_URL}/friends/add/${id}`);
  },

  deleteFromFriends: id => {
    return apiQuery.post(`${USER_BASE_URL}/friends/delete/${id}`);
  },

  changeProfile: changes => {
    const { firstName, lastName, birthDate, description, photo } = changes;
    const formData = new FormData();

    if (firstName) formData.append('first_name', firstName);
    if (lastName) formData.append('last_name', lastName);
    if (birthDate) formData.append('birth_date', birthDate);
    if (description) formData.append('description', description);
    if (photo)
      formData.append('photo', {
        uri: photo,
        type: 'image/jpeg',
        name: 'profile-photo',
      });

    return apiQuery.post(`${USER_BASE_URL}/profile/change`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        return formData;
      },
    });
  },
};

export default userApi;
