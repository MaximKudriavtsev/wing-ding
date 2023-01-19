import { apiQuery } from '../query';
import { EventApi } from './types';
import { CreateEventArgs } from './types';

const EVENT_BASE_URL = '/event';

const createEventFormData = (object: CreateEventArgs) => {
  const { title, date, place, text, img } = object;
  const formData = new FormData();
  if (title) formData.append('title', title);
  if (date) formData.append('date', date);
  if (place) formData.append('place', place);
  if (text) formData.append('text', text);
  if (img)
    formData.append('img', {
      uri: img,
      type: 'image/jpeg',
      name: 'event-img',
    });
  return formData;
};

const eventApi: EventApi = {
  createEvent: ({ title, date, place, text, img }) => {
    const formData = createEventFormData({ title, date, place, text, img });

    return apiQuery.post(`${EVENT_BASE_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        return formData;
      },
    });
  },

  updateEvent: (changes, id) => {
    const formData = createEventFormData(changes);
    formData.append('event_id', id);

    return apiQuery.post(`${EVENT_BASE_URL}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        return formData;
      },
    });
  },

  deleteEvent: id => {
    return apiQuery.delete(`${EVENT_BASE_URL}/${id}`);
  },

  getEvent: id => {
    return apiQuery.post(`${EVENT_BASE_URL}/get/${id}`);
  },

  getMembers: id => {
    return apiQuery.post(`${EVENT_BASE_URL}/get/${id}/users`);
  },

  joinEvent: id => {
    return apiQuery.post(`${EVENT_BASE_URL}/join/${id}`);
  },

  leaveEvent: id => {
    return apiQuery.post(`${EVENT_BASE_URL}/leave/${id}`);
  },
};

export default eventApi;
