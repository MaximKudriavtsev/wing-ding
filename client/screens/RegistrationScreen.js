import React from "react";
import { View, Text, TextInput, Button, Pressable, TouchableOpacity} from 'react-native'
import { THEME, LOGIN_STYLE } from "../components/theme";

export const RegistrationScreen = ({toAuthentication}) => {
    return (
        <View style={LOGIN_STYLE.wrapper}>
            <Text style={LOGIN_STYLE.title}>Регистрация</Text>
            <TextInput 
                style={LOGIN_STYLE.input} 
                placeholder="Логин" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <TextInput 
                style={LOGIN_STYLE.input} 
                placeholder="Пароль" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <TextInput 
                style={LOGIN_STYLE.input} 
                placeholder="E-mail" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <Pressable style={LOGIN_STYLE.button}>
                <Text style={LOGIN_STYLE.button__text}>Зарегистрироваться</Text>
            </Pressable>
            <TouchableOpacity onPress={toAuthentication}>
                <Text style={LOGIN_STYLE.label}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
        </View>
    )
}