import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Column } from '../components/Column';
import { Row } from '../components/Row';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { TextInput } from '../components/ui/TextInput';
import { Loader } from '../components/ui/Loader';
import { dateRu, validate } from '../src/utils';
import { SCREEN_STYLE, THEME } from '../components/theme.js';

export const CreateEventScreen = () => {
  return (
    <View style={SCREEN_STYLE.wrapper}>
      <ScrollView>
        <Text style={styles.label}>Название</Text>
        <TextInput placeholder={'Введите название'} />
        <Row style={styles.row}>
          <TouchableOpacity
            style={styles.coverWrapper}
            activeOpacity={0.7}
            onPress={() => console.log('Load photo')}
          >
            <View style={styles.coverWrapper}>
              <ImageBackground
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
                source={{ uri: 'https://vibirai.ru/image/1245358.w640.jpg' }}
              />
            </View>
          </TouchableOpacity>

          <Column>
            <Text style={styles.label}>Дата</Text>
            <TextInput
              style={styles.smallInput}
              iconName={THEME.ICON_CALENDAR}
              placeholder={'Дата'}
            />
            <Text style={styles.label}>Время:</Text>
            <TextInput
              style={styles.smallInput}
              iconName={THEME.ICON_CLOCK}
              placeholder={'Время'}
            />
          </Column>
        </Row>
        <Text style={styles.label}>Место</Text>
        <TextInput style={styles.smallInput} iconName={THEME.ICON_LOCATION} placeholder={'Место'} />
        <Text style={styles.label}>Описание</Text>
        <TextInput
          style={{ height: 100, marginBottom: 30 }}
          iconName={THEME.ICON_PENCIL}
          multiline={true}
          numberOfLines={4}
          placeholder={'Добавьте описание'}
        />
        <Button type={'primary'}>Создать событие</Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '50%',
    height: 170,
    marginBottom: 10,
  },

  coverWrapper: {
    display: 'flex',
    width: '110%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },

  image: {
    width: '100%',
    height: 170,
    borderRadius: 30,
  },

  smallInput: {
    width: '90%',
  },

  label: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
