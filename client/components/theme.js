import { StyleSheet } from "react-native"

export const THEME = {
    FONT_COLOR: '#ddd',
    PLACEHOLDER_COLOR: '#666',
    BACKGROUND_COLOR: '#1b162a',
    DARKER_COLOR: '#181327',
    BUTTON_COLOR: '#0df5e3',
    BUTTON_FONT_COLOR: '#1a1523'
}

export const LOGIN_STYLE = {
    login: {
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20
    },

    login__title: {
        color: '#ddd',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30
    },

    login__label: {
        color: '#ddd',
        fontSize: 16,
        width: '100%',
        marginTop: 50,
        textAlign: 'center'
    },

    login__input: {
        color: '#ddd',
        width: '100%',
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: THEME.DARKER_COLOR,
        borderRadius: 10,
        marginBottom: 10,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#0df5e3',
        borderRadius: 50,
        marginTop: 30
    },

    button__text: {
        color: '#1a1523',
        fontSize: 18,
        fontWeight: 'bold'
    }
}