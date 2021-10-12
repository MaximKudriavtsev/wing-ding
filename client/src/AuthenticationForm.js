import React from "react";
import { View, Text, TextInput, Button, Pressable, StyleSheet} from 'react-native'

export const AuthenticationForm = () => {
    return (
        <View style={styles.tab}>
            <Text style={styles.tab__title}>Sign In</Text>
            <TextInput style={styles.tab__input} placeholder="Login" placeholderTextColor="#666"></TextInput>
            <TextInput style={styles.tab__input} placeholder="Password" placeholderTextColor="#666"></TextInput>
            <TextInput style={styles.tab__input} placeholder="E-mail" placeholderTextColor="#666"></TextInput>
            <Pressable style={styles.button}>
                <Text style={styles.button__text}>Confirm</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    tab: {
        width: '100%',
        height: 300,
        paddingHorizontal: 30,
        paddingVertical: 20
    },

    tab__title: {
        color: '#ddd',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30
    },

    tab__label: {
        color: '#ddd',
        fontSize: 24,
    },

    tab__input: {
        color: '#ddd',
        width: '100%',
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#171220',
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
})