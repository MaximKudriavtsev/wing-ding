import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const dateRu = dayjs;

export const validate = (value, validations) => {
  let isLengthy = true,
    isFilled = true,
    isEmail = true,
    isSame = true,
    isValid = true;

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
