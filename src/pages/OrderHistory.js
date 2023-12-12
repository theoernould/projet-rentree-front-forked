import React, { useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useApplicationContext} from "../contexts/AuthContext";
import OrderHistoryOrder from "../components/OrderHistoryOrder";
import {useDispatch, useSelector} from "react-redux";
import { loadOrders} from "../slices/Orders";
import BottomNavigationBar from "../components/BottomNavigationBar";
import SortingForm from "../components/SortingForm";

export default function OrderHistory({ navigation }) {
    const {IsAnyUserLogedIn} = useApplicationContext();

    const dispatch = useDispatch();
    const [sortType, setSortType] = useState("DATE");
    const [sortingOrders, setSortingOrders] = useState('desc')

    const orders = useSelector(state => state.orders.value)


    React.useCallback(() => {
        if (!IsAnyUserLogedIn()) {
            navigation.replace('Menu');
        }else{
            dispatch(loadOrders({ sortType, sortingOrders }))
        }
        return () => {};
    }, [dispatch])

    const handleSortingChange = ({ sortType, sortOrder }) => {
        setSortType(sortType);
        setSortingOrders(sortOrder);
        dispatch(loadOrders({ sortType, sortOrder }));
    };

    return (
        <View className="flex-1">
            <ScrollView>
                <View className="mx-5 xl:mx-48">
                    <View className="bg-white mt-10 p-5 shadow-xl">
                        <SortingForm
                            sortingMethods={{PRICE: "Prix",DATE: "Date"}}
                            sortType={sortType}
                            sortOrder={sortingOrders}
                            onSortingChange={handleSortingChange}
                        />
                    </View>

                    <View className="mt-10 mb-5 p-5 w-full">
                        <Text className="text-4xl">Vos commandes</Text>
                        <View className="w-full sm:w-1/2 h-1 bg-[#713235] mb-3"></View>


                        {orders.map((order) => {
                            return (<OrderHistoryOrder orderId={order.id} />)
                        })}
                    </View>
                </View>
            </ScrollView>
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>
    );
}