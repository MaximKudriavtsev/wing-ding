import React from "react";
import { View, Text, TextInput, Pressable, TouchableOpacity} from 'react-native'
import { THEME } from "../components/theme";
import { LOGIN_STYLE } from "../components/theme";

export const ResetPasswordScreen = ({toAuthentication, toRegistration, toPasswordSetting }) => {
    return (
        <View style={LOGIN_STYLE.login}>
            <Text style={LOGIN_STYLE.login__title}>Восстановление пароля</Text>
            <TextInput 
                style={LOGIN_STYLE.login__input} 
                placeholder="E-mail" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <Pressable 
                style={LOGIN_STYLE.button} 
                onPress={() => {toPasswordSetting()}}
            >
                <Text style={LOGIN_STYLE.button__text}>Восстановить</Text>
            </Pressable>
            <TouchableOpacity onPress={() => toAuthentication()}>
                <Text style={LOGIN_STYLE.login__label}>Я помню свой пароль</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toRegistration()}>
                <Text style={LOGIN_STYLE.login__label}>Создать новый аккаунт</Text>
            </TouchableOpacity>
        </View>
    )
}