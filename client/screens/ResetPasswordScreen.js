import React from "react";
import { View, Text, TextInput, Pressable, TouchableOpacity} from 'react-native'
import { THEME, LOGIN_STYLE } from "../components/theme";

export const ResetPasswordScreen = ({toAuthentication, toRegistration, toPasswordSetting }) => {
    return (
        <View style={LOGIN_STYLE.wrapper}>
            <Text style={LOGIN_STYLE.title}>Восстановление пароля</Text>
            <TextInput
                style={LOGIN_STYLE.input}
                placeholder="E-mail"
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <Pressable
                style={LOGIN_STYLE.button}
                onPress={toPasswordSetting}
            >
                <Text style={LOGIN_STYLE.button__text}>Восстановить</Text>
            </Pressable>
            <TouchableOpacity onPress={toAuthentication}>
                <Text style={LOGIN_STYLE.label}>Я помню свой пароль</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toRegistration}>
                <Text style={LOGIN_STYLE.label}>Создать новый аккаунт</Text>
            </TouchableOpacity>
        </View>
    )
}
