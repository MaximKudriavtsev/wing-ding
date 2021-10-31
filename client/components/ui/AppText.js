import React from "react";
import {Text, StyleSheet} from 'react-native'
import { THEME } from "../theme";

export const AppText = props => {
    return (
        <Text style={{...styles.default, ...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    default: {
        fontFamily: THEME.REGULAR_FONT,
        color: THEME.FONT_COLOR
    }
})
