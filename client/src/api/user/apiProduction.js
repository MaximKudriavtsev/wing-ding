import { BASE_URL } from '../../config';
const USER_BASE_URL = `${BASE_URL}/api/user`;

export const userApi = {
  auth: ({ login, password }) => {
    return fetch(`${USER_BASE_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  registration: ({ login, email, password }) => {
    return fetch(`${USER_BASE_URL}/registration`, {
      method: 'POST',
      body: JSON.stringify({ login, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
