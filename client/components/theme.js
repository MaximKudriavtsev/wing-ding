import { StyleSheet } from "react-native"

export const THEME = {
  //General
    FONT_COLOR: '#ddd',
    BACKGROUND_COLOR: '#1b162a',
    DARKER_COLOR: '#181327',
    TITLE_FONT_SIZE: 28,
    LABEL_FONT_SIZE: 16,
  //Button
    BUTTON_COLOR: '#0df5e3',
    BUTTON_FONT_COLOR: '#1a1523',
    BUTTON_FONT_SIZE: 18,
  //Input
    PLACEHOLDER_COLOR: '#666',
}

export const LOGIN_STYLE = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20
    },

    title: {
        color: THEME.FONT_COLOR,
        fontSize: THEME.TITLE_FONT_SIZE,
        fontWeight: 'bold',
        marginBottom: 30
    },

    label: {
        color: THEME.FONT_COLOR,
        fontSize: THEME.LABEL_FONT_SIZE,
        width: '100%',
        marginTop: 50,
        textAlign: 'center'
    },

    input: {
        color: THEME.FONT_COLOR,
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
        backgroundColor: THEME.BUTTON_COLOR,
        borderRadius: 50,
        marginTop: 30
    },

    button__text: {
        color: THEME.BUTTON_FONT_COLOR,
        fontSize: THEME.BUTTON_FONT_SIZE,
        fontWeight: 'bold'
    }
})
