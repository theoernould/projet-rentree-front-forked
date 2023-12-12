import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button} from 'react-native';
import axios from "axios";
import {useApplicationContext} from "../contexts/AuthContext";
import {toaster} from "evergreen-ui";
import {useDispatch, useSelector} from "react-redux";
import {loadUserInfo} from "../slices/User";

export default function OrderCompleted({ route, navigation }) {
    const [solde, setSolde] = useState(0);

    const { token, dishes } = useApplicationContext();

    const {IsAnyUserLogedIn} = useApplicationContext();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);


    useEffect(() => {
        if (!IsAnyUserLogedIn()) {
            navigation.replace('Menu');
        }else{
            dispatch(loadUserInfo());
        }
    }, []);


    const soldeRestant = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/users/info', {
                headers: {
                    token: token,
                },
            });
            setSolde(response.data.balance);
        } catch (error) {
            toaster.danger(error.response.data);
        }

    };

    return (

        <View className="flex-1 justify-center items-center">
            <View className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center bg-white shadow-xl">
                <Image
                    className="w-[300px] h-[200px] mb-5"
                    source={{
                        uri: 'https://i.guim.co.uk/img/media/88f6b98714035656cb18fb282507b60e82edb0d7/0_57_2560_1536/master/2560.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=74b1dd992e5428e4906b1e331a57a305',
                    }}
                />
                <Text className="text-3xl font-bold text-center">Commande validée !</Text>
                <Text className="text-xl text-center">
                    Elle vous attendra à la fin de vos rattrapages !
                </Text>
                <Text className="text-2xl text-[#713235] font-bold mt-5 text-center">
                    Solde CROUS restant : {user?.balance?.toFixed(2)} €
                </Text>
                <View className="mt-5 flex flex-row justify-center flex-wrap">
                    <View className="mx-3 my-1">
                        <Button title={"Retour à la carte"} color="#713235" onPress={() => navigation.replace('Menu')}/>
                    </View>
                    <View className="mx-3 my-1">
                        <Button title={"Voir mon historique de commande"} color="#713235" onPress={() => navigation.replace('OrderHistory')}/>
                    </View>
                </View>

            </View>
        </View>


    );
}