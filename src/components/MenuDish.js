import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Image, Button} from 'react-native';
import {useDispatch} from "react-redux";
import {addDishesToBasket} from "../slices/Basket";
export default function MenuDish({id, name, image, price, description, navigation}) {

    const [quantity] = useState(1);
    const dispatch = useDispatch();
    const onPressCard = ()=> {
        navigation.navigate('DishDetail',
            {
                id: id,
            });
    };

    return (
        <View className="w-full md:w-1/2 xl:w-1/4 mt-5">
            <View className="bg-white shadow-xl m-3 h-full">
                <TouchableOpacity onPress={onPressCard}>
                    <Image className="w-full h-[400px]"
                           source={{ uri: image }}
                    />
                </TouchableOpacity>
                <View className="mt-3 mb-7 px-10 flex-1 flex flex-col justify-between">
                    <View className="flex flex-row items-center justify-between w-full">
                        <Text className="text-3xl">{name}</Text>
                        <Text className="text-2xl text-[#713235] font-bold">{price.toFixed(2)}€</Text>
                    </View>
                    <Text className="my-5 text-xl">{description} </Text>

                    <Button title="Ajouter au panier" color="#713235" onPress={() => dispatch(addDishesToBasket({ dishId: id, quantity: quantity }))} />
                </View>
            </View>
        </View>



    );
}
