import React from 'react';
import {View, Image, Text, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addDishesToBasket, removeDishesFromBasket } from '../slices/Basket';

export default function BasketDish({ item }) {
    const dispatch = useDispatch();
    const basket = useSelector(state => state.basket.basket);

    const quantity = basket.find((element) => element.id === item.id)?.quantity || 0;

    return (
        <View className="flex flex-col md:flex-row justify-start bg-white mb-10 shadow-xl">
            <Image
                source={{ uri: item.image }}
                className="w-full h-[200px] md:h-full md:w-[200px]"
            />
            <View className="m-5 flex-1">
                <View className="flex flex-row items-center justify-between w-full mb-5">
                    <Text className="text-3xl">{item.name}</Text>
                    <Text className="text-2xl text-[#713235] font-bold">{item.price.toFixed(2)}€</Text>
                </View>

                <View className="flex flex-row items-center mb-5">
                    <View className="flex flex-row items-center">
                        <Button title={"-"} color="#713235" onPress={() => dispatch(removeDishesFromBasket({ dishId: item.id, quantity: 1 }))}/>
                        <Text className="text-2xl mx-5">{basket.find((element) => element.id === item.id).quantity}</Text>
                        <Button title={"+"} color="#713235" onPress={() => dispatch(addDishesToBasket({ dishId: item.id, quantity: 1 }))}/>
                    </View>
                </View>

                <View className="flex flex-row items-center justify-between w-full mb-5">
                    <Text className="text-xl">Total : { (item.price * quantity).toFixed(2) }€</Text>
                    <Icon name="trash" size={30} color="#713235" onPress={() => dispatch(removeDishesFromBasket({ dishId: item.id, quantity: 0 }))}/>
                </View>
            </View>
        </View>
    );
}
