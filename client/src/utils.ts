import { USERS } from '../components/data';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import mergeWith from 'lodash/mergeWith';
import isEqual from 'lodash/isEqual';

type Size = {
  h: number;
  w: number;
};

export const cutPhoto = (size: Size): Size => {
  let resized = { ...size };

  if (resized.h > 1280 || resized.w > 1280) {
    resized = { h: size.h / 1.3, w: size.w / 1.3 };
    return cutPhoto(resized);
  }
  return resized;
};

dayjs.locale('ru');
dayjs.extend(customParseFormat);

export const dateRu = dayjs;

export const validate = (value: string, validations: any) => {
  let isLengthy = true;
  let isShorty = true;
  let isRequired = true;
  let isEmail = true;
  let isSame = true;
  let isValid = true;
  let isName = true;
  let isDateString = true;
  let isTimeString = true;

  for (const validation in validations) {
    switch (validation) {
      case 'isRequired':
        value ? (isRequired = true) : ((isRequired = false), (isValid = false));
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
    isRequired,
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

export const decodeError = (error: string) => {
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

export const findUserById = (id: string) => USERS.find(user => user.id == id);

export const getObjectChanges = (n: any, t: any) => {
  const changes: any = {};
  mergeWith(t, n, function (objectValue: object, sourceValue: object, key: string) {
    if (!isEqual(objectValue, sourceValue) && Object(objectValue) !== objectValue) {
      changes[key] = sourceValue;
    }
  });
  return changes;
};
