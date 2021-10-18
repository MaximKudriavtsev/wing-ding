import React from "react";
import { View, Text, TextInput, Button, Pressable, TouchableOpacity} from 'react-native'
import { THEME } from "../components/theme";
import { LOGIN_STYLE } from "../components/theme";

export const RegistrationScreen = ({toAuthentication}) => {
    return (
        <View style={LOGIN_STYLE.login}>
            <Text style={LOGIN_STYLE.login__title}>Регистрация</Text>
            <TextInput 
                style={LOGIN_STYLE.login__input} 
                placeholder="Логин" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <TextInput 
                style={LOGIN_STYLE.login__input} 
                placeholder="Пароль" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <TextInput 
                style={LOGIN_STYLE.login__input} 
                placeholder="E-mail" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <Pressable style={LOGIN_STYLE.button}>
                <Text style={LOGIN_STYLE.button__text}>Зарегистрироваться</Text>
            </Pressable>
            <TouchableOpacity onPress={() => toAuthentication()}>
                <Text style={LOGIN_STYLE.login__label}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
        </View>
    )
}