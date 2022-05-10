import { USERS } from '../components/data';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';
import { BASE_URL } from './config';

const camelizeString = s => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const camelizeKeys = object => {
  if (typeof object === 'object' && !Array.isArray(object) && object != null) {
    const camelObject = {};

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

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.response.use(response => {
  if (response.data.status === 'error') {
    const error = Error(response.data.error);
    error.response = response;
    throw error;
  }

  return camelizeKeys(response);
});

export const createAuthorizationInterceptor = token => {
  //returns interceptors id
  return api.interceptors.request.use(config => {
    config.headers.Authorization = token;
    return config;
  });
};

export const ejectInterceptor = id => {
  api.interceptors.request.eject(id);
};

dayjs.locale('ru');
dayjs.extend(customParseFormat);

export const dateRu = dayjs;

export const validate = (value, validations) => {
  let isLengthy = true;
  let isShorty = true;
  let isFilled = true;
  let isEmail = true;
  let isSame = true;
  let isValid = true;
  let isName = true;
  let isDateString = true;
  let isTimeString = true;

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
      case 'maxLength':
        value.length < validations[validation]
          ? (isShorty = true)
          : ((isShorty = false), (isValid = false));
        break;
      case 'isEmail':
        /^.+@.+\..+$/.test(value) ? (isEmail = true) : ((isEmail = false), (isValid = false));
        break;
      case 'isSame':
        value == validations[validation] ? (isSame = true) : ((isSame = false), (isValid = false));
        break;
      case 'isName':
        /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/.test(value)
          ? (isName = true)
          : ((isName = false), (isValid = false));
        break;
      case 'isDateString':
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
          value,
        )
          ? (isDateString = true)
          : ((isDateString = false), (isValid = false));
        break;
      case 'isTimeString':
        /^(((0|1)?[0-9])|(2[0-3])):[0-5][0-9]$/.test(value)
          ? (isTimeString = true)
          : ((isTimeString = false), (isValid = false));
        break;
    }
  }

  return {
    isFilled,
    isLengthy,
    isShorty,
    isEmail,
    isSame,
    isName,
    isValid,
    isDateString,
    isTimeString,
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

export const findUserById = id => USERS.find(user => user.id == id);
