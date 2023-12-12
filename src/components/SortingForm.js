import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SortingForm = ({ sortingMethods, sortType: defaultSortType, sortOrder: defaultSortOrder, onSortingChange }) => {
    const [sortType, setSortType] = React.useState(defaultSortType);
    const [sortOrder, setSortOrder] = React.useState(defaultSortOrder);

    useEffect(() => {
        onSortingChange({ sortType, sortOrder });
    }, [sortType, sortOrder]);

    return (
        <View className="w-full flex flex-col sm:flex-row">

            <View className="w-full sm:w-1/2">
                <Text className="text-2xl">Trier par</Text>
                <View className="w-full sm:w-1/2 h-1 bg-[#713235] mb-3"></View>
                <View className="w-1/2 text-2xl">
                    <Picker
                        style={pickerStyles.container}
                        selectedValue={sortType}
                        onValueChange={(itemValue) => setSortType(itemValue)}
                    >
                        {Object.entries(sortingMethods).map(([value, label]) => (
                            <Picker.Item key={value} label={label} value={value} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View className="w-full sm:w-1/2">
                <Text className="text-2xl">Ordre de tri</Text>
                <View className="w-full sm:w-1/2 h-1 bg-[#713235] mb-3"></View>
                <View className="flex flex-row">
                    <TouchableOpacity
                        onPress={() => setSortOrder('asc')}
                        className={`mr-3 shadow p-2 rounded my-1 ${sortOrder === 'asc' ? 'bg-[#713235]' : 'bg-white'}`}
                    >
                        <Text className={ `text-xl ${sortOrder === 'asc' ? 'text-white' : 'text-black'}`} >Croissant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSortOrder('desc')}
                        className={`mr-3 shadow p-2 rounded my-1 ${sortOrder === 'desc' ? 'bg-[#713235]' : 'bg-white'}`}
                    >
                        <Text className={ `text-xl ${sortOrder === 'desc' ? 'text-white' : 'text-black'}`}>Décroissant</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const pickerStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: 25,
        padding: 10,
        border: '1px solid #713235',
        width: 'auto',
    },
});

export default SortingForm;