import { api } from './../../utils';
const EVENT_BASE_URL = '/event';

export const eventApi = {
  createEvent: ({ title, date, place, description, img }) => {
    return api.post(`${EVENT_BASE_URL}/create`, {
      title,
      date,
      place,
      text: description,
      img,
    });
  },

  getEvent: id => {
    return api.post(`${EVENT_BASE_URL}/get/${id}`);
  },

  getMembers: id => {
    return api.post(`${EVENT_BASE_URL}/get/${id}/users`);
  },

  joinEvent: id => {
    return api.post(`${EVENT_BASE_URL}/join/${id}`);
  },

  leaveEvent: id => {
    return api.post(`${EVENT_BASE_URL}/leave/${id}`);
  },
};
