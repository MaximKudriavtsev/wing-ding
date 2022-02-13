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

dayjs.locale('ru');

export const dateRu = dayjs;

export const validate = (value, validations) => {
  let isLengthy = true;
  let isFilled = true;
  let isEmail = true;
  let isSame = true;
  let isValid = true;

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
    }
  }

  return {
    isFilled,
    isLengthy,
    isEmail,
    isSame,
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

export const findUserById = id => USERS.find(user => user.id == id);

export const showAlertMessage = (onShow, onSetText, text, onSetAlertIcon, icon) => {
  onSetText(text);
  onSetAlertIcon(icon);
  onShow(true);
  setTimeout(() => {
    onShow(false);
  }, 2500);
};
