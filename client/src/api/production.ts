import userApi from './user/apiProduction';
import eventApi from './event/apiProduction';

const api = {
  user: userApi,
  event: eventApi,
};

export default api;
