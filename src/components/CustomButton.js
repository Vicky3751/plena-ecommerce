import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, type }) => {
    const buttonStyles = type === 'primary' ? styles.primaryButton : styles.secondaryButton;
    const buttonTextStyles = type === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText;

    return (
        <TouchableOpacity style={[styles.button, buttonStyles]} onPress={onPress}>
            <Text style={[styles.buttonText, buttonTextStyles]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        alignItems: 'center',
        height : 56,
        justifyContent : 'center',
        alignItems : 'center'
    },
    primaryButton: {
        borderColor: '#2A4BA0',
        borderWidth: 1,
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    secondaryButton: {
        backgroundColor: '#2A4BA0',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    primaryButtonText: {
        color: '#2A4BA0',
    },
    secondaryButtonText: {
        color: '#FFF',
    },
});

export default CustomButton;
