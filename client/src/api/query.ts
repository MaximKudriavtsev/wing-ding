import axios from 'axios';

const BASE_URL = 'http://5.101.7.207';

const snakeToCamelString = (s: string) =>
  s.replace(/([-_][a-z])/gi, $1 => $1.toUpperCase().replace('-', '').replace('_', ''));

const camelToSnakeString = (s: string) => s.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
const snakeToCamelObject = (object: any): any => {
  if (typeof object === 'object' && !Array.isArray(object) && object != null) {
    const camelObject: any = {};

    Object.keys(object).forEach(key => {
      camelObject[snakeToCamelString(key)] = snakeToCamelObject(object[key]);
    });

    return camelObject;
  }

  if (Array.isArray(object)) {
    return object.map(i => snakeToCamelObject(i));
  }

  return object;
};

const camelToSnakeObject = (object: any): any => {
  if (typeof object === 'object' && !Array.isArray(object) && object != null) {
    const snakeObject: any = {};

    Object.keys(object).forEach(key => {
      snakeObject[camelToSnakeString(key)] = camelToSnakeObject(object[key]);
    });

    return snakeObject;
  }

  if (Array.isArray(object)) {
    return object.map(i => camelToSnakeObject(i));
  }

  return object;
};

export const apiQuery = axios.create({
  baseURL: `${BASE_URL}/api`,
});

apiQuery.interceptors.response.use(response => {
  if (response.data.status === 'error') {
    const error = Error(`ERROR: ${response.data.error}\nResponse: ${response}`);
    throw error;
  }

  return snakeToCamelObject(response);
});

export const createAuthorizationInterceptor = (token: string) => {
  //returns interceptors id
  return apiQuery.interceptors.request.use(config => {
    if (config && config.headers) {
      config.headers.Authorization = token;
    }
    config.data = camelToSnakeObject(config.data);
    return config;
  });
};

export const ejectInterceptor = (id: number) => {
  apiQuery.interceptors.request.eject(id);
};
