import axios from 'axios';

const camelizeString = (s: string) =>
  s.replace(/([-_][a-z])/gi, $1 => $1.toUpperCase().replace('-', '').replace('_', ''));

const camelizeKeys = (object: any): any => {
  if (typeof object === 'object' && !Array.isArray(object) && object != null) {
    const camelObject: any = {};
  
    Object.keys(object).forEach(key => {
      camelObject[camelizeString(key)] = camelizeKeys(object[key]);
    });
  
    return camelObject;
  }
  
  if (Array.isArray(object)) {
    return object.map(i => camelizeKeys(i));
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
  
  return camelizeKeys(response);
});

export const createAuthorizationInterceptor = (token: string) => {
    //returns interceptors id
    return apiQuery.interceptors.request.use(config => {
    if (config && config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  });
};
  
export const ejectInterceptor = (id: number) => {
  apiQuery.interceptors.request.eject(id);
};