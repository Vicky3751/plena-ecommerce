import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomDropdown = ({ options, onSelect, selectedValue }) => {
    return (
        <View style={styles.dropdownContainer}>
            <Picker
                selectedValue={selectedValue ? selectedValue : 1}
                onValueChange={(itemValue) => onSelect(itemValue)}
                style={styles.picker}
                dropdownIconColor={"#fff"}
            >
                <Picker.Item label="Select an option" value={null} />
                {options.map((item, index) => (
                    <Picker.Item key={`${item?.name}-${index}`} label={item?.name} value={item?.id} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        borderRadius: 5,
        width: '100%',
    },
    picker: {
        width: '100%',
        marginLeft: -16,
        color: "#fff",
        marginTop: -16
    },
});

export default CustomDropdown;
