import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const CustomInput = ({ value, placeholder, onChangeText, leftIcon, rightIcon }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                {leftIcon && <Image source={leftIcon} style={styles.icon} />}
                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    placeholderTextColor={"#8891A5"}
                />
                {rightIcon && <Image source={rightIcon} style={styles.icon} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        overflow: 'hidden',
        borderRadius: 28,
        backgroundColor: '#153075'
    },
    input: {
        flex: 1,
        paddingLeft: 10,
        color : "#fff"
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 28,
    },
});

export default CustomInput;
