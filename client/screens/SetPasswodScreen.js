import React from "react";
import { View, Text, TextInput, Pressable, TouchableOpacity} from 'react-native'
import { THEME, LOGIN_STYLE } from "../components/theme";

export const SetPasswordScreen = ({toAuthentication, toResetting}) => {
    return (
        <View style={LOGIN_STYLE.wrapper}>
            <Text style={LOGIN_STYLE.title}>Установить новый пароль</Text>
            <TextInput 
                style={LOGIN_STYLE.input} 
                placeholder="Новый пароль" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />
            <TextInput 
                style={LOGIN_STYLE.input} 
                placeholder="Подтвердите пароль" 
                placeholderTextColor={THEME.PLACEHOLDER_COLOR}
            />

            <Pressable style={LOGIN_STYLE.button} onPress={toAuthentication}>
                <Text style={LOGIN_STYLE.button__text}>Установить</Text>
            </Pressable>
            <TouchableOpacity onPress={toResetting}>
                <Text style={LOGIN_STYLE.label}>Я не получил сообщение</Text>
            </TouchableOpacity>
        </View>
    )
}