import React from 'react';
import { Text } from './Text';
import { THEME } from '../theme';

export const ValidationHint = ({ validations }, fontSize) => {
  let text = '';
  if (validations) {
    const { isRequired, isLengthy, isEmail, isSame, isName } = validations;

    if (!isEmail) text = 'Введите действующий E-mail адрес';
    if (!isLengthy) text = 'Недостаточное количество символов';
    if (!isRequired) text = 'Поле не может быть пустым';
    if (!isSame) text = 'Поле не совпадает';
    if (!isName) text = 'Введите свои настоящие данные';
  }

  return (
    <Text fontSize={fontSize} style={{ color: THEME.DANGER_COLOR, marginBottom: 5 }}>
      {text}
    </Text>
  );
};
