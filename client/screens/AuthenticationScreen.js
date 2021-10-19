import React from "react";
import { View, Text, TextInput, Pressable, TouchableOpacity} from 'react-native'
import { THEME, LOGIN_STYLE } from "../components/theme";

export const AuthenticationScreen = ({toRegistration, toResetting}) => {
    return (
        <View style={LOGIN_STYLE.wrapper}>
            <Text style={LOGIN_STYLE.title}>Добро пожаловать!</Text>
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
            <Pressable style={LOGIN_STYLE.button}>
                <Text style={LOGIN_STYLE.button__text}>Войти</Text>
            </Pressable>
            <TouchableOpacity onPress={toResetting}>
                <Text style={LOGIN_STYLE.label}>Я не помню пароль</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toRegistration}>
                <Text style={LOGIN_STYLE.label}>Еще не с нами? Зарегистрируйтесь!</Text>
            </TouchableOpacity>
        </View>
    )
}