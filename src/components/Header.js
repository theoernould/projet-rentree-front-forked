import React from 'react';
import { View, Text } from 'react-native';

export default function Header() {
    return (
        <View className="flex flex-row justify-center items-center">
            <Text className="text-2xl font-bold w-full text-center">Delivecrous 🛒</Text>
        </View>
    );
}