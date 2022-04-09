import { USERS } from '../components/data';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import axios from 'axios';
import { BASE_URL } from './config';

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.response.use(response => {
  if (response.data.status === 'error') {
    const error = Error(response.data.error);
    error.response = response;
    throw error;
  }
  return response;
});

export const setAuthorizationInterceptor = token => {
  api.interceptors.request.use(config => {
    config.headers.Authorization = token;
    return config;
  });
};

dayjs.locale('ru');

export const dateRu = dayjs;

export const validate = (value, validations) => {
  let isLengthy = true;
  let isFilled = true;
  let isEmail = true;
  let isSame = true;
  let isValid = true;
  let isName = true;

  for (const validation in validations) {
    switch (validation) {
      case 'isFilled':
        value ? (isFilled = true) : ((isFilled = false), (isValid = false));
        break;
      case 'minLength':
        value.length > validations[validation]
          ? (isLengthy = true)
          : ((isLengthy = false), (isValid = false));
        break;
      case 'isEmail':
        /^.+@.+\..+$/.test(value) ? (isEmail = true) : ((isEmail = false), (isValid = false));
        break;
      case 'isSame':
        value == validations[validation] ? (isSame = true) : ((isSame = false), (isValid = false));
      case 'isName':
        /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/.test(value)
          ? (isName = true)
          : ((isName = false), (isValid = false));
    }
  }

  return {
    isFilled,
    isLengthy,
    isEmail,
    isSame,
    isName,
    isValid,
  };
};

export const decodeError = error => {
  let message = 'Неизвестная ошибка. Попробуйте позже';
  switch (error) {
    case 'Unauthorized':
      message = 'Неверный логин или пароль';
      break;
    case 'login already exist':
      message = 'Пользователь с таким логином уже существует';
      break;
    case 'email already exist':
      message = 'Данная почта уже используется';
      break;
  }

  return message;
};

export const camelizeString = s => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};
export const camelizeKeys = object => {
  if (Array.isArray(object) || typeof object != 'object' || object === null) {
    return object;
  }

  const camelObject = {};

  Object.keys(object).forEach(key => {
    camelObject[camelizeString(key)] = camelizeKeys(object[key]);
  });

  return camelObject;
};

export const findUserById = id => USERS.find(user => user.id == id);
