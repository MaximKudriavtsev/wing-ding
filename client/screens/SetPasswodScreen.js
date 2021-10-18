import React from "react";
import { View, Text, TextInput, Pressable, TouchableOpacity} from 'react-native'
import { THEME } from "../components/theme";
import { LOGIN_STYLE } from "../components/theme";

export const SetPasswordScreen = ({toAuthentication, toResetting}) => {
    return (
        <View style={LOGIN_STYLE.login}>
            <Text style={LOGIN_STYLE.login__title}>Установить новый пароль</Text>
            <TextInput 
                style={LOGIN_STYLE.login__input} 
                placeholder="Новый пароль" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <TextInput 
                style={LOGIN_STYLE.login__input} 
                placeholder="Подтвердите пароль" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />

            <Pressable style={LOGIN_STYLE.button} onPress={() => toAuthentication()}>
                <Text style={LOGIN_STYLE.button__text}>Установить</Text>
            </Pressable>
            <TouchableOpacity onPress={() => toResetting()}>
                <Text style={LOGIN_STYLE.login__label}>Я не получил сообщение</Text>
            </TouchableOpacity>
        </View>
    )
}