import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PasswordInput({ id, placeholder, onChangeTextFunction }) {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setPasswordVisibility((prevVisibility) => !prevVisibility);
    };

    return (
        <View className="mb-2 p-2 border border-[#713235] rounded flex flex-row items-center justify-between">
            <TextInput
                className="w-full h-full"
                id={id}
                secureTextEntry={!isPasswordVisible}
                onChangeText={onChangeTextFunction}
                placeholder={placeholder}
            />

            <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" className="ml-5 mr-4" />
            </TouchableOpacity>
        </View>
    );
}
