import React, {useEffect, useState,} from 'react';
import {View, Text, Button, ScrollView, Image} from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../contexts/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {loadUserInfo} from "../slices/User";
import PasswordInput from "../components/PasswordInput";
const Profile = ({ navigation, route }) => {
    const { resetPassword, handleLogOut, IsAnyUserLogedIn } = useApplicationContext();

    const [actualPassword, setActualPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);


    useEffect(() => {
        if (!IsAnyUserLogedIn()) {
            navigation.replace('Menu');
        }else{
            dispatch(loadUserInfo());
        }
    }, [actualPassword, newPassword]);

    return (
        <View className="flex-1">
            <ScrollView>
                <View className="flex flex-col justify-start items-center">
                    <View className="w-full h-[100px]"></View>

                    <View className="flex flex-col items-center w-full md:w-1/2 bg-white shadow-xl p-8">
                        <View className="flex flex-col xl:flex-row w-full items-center justify-center mb-10">
                            <Image
                                source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                                className="hidden md:flex h-[200px] w-[200px] rounded-full"
                            />

                            <View className="p-5 flex-1">
                                <Text className="text-4xl">{user?.firstname} {user?.lastname}</Text>
                                <View className="w-full h-1 bg-[#713235] mb-3"></View>
                                <Text className="text-xl">Courriel : {user?.email}</Text>
                                <Text className="text-xl mb-3">Adresse : {user?.address}</Text>
                                <Text className="text-2xl text-[#713235] mb-5">Vous avez {user?.balance?.toFixed(2)}€ sur votre compte</Text>

                                <View className="flex flex-row flex-wrap justify-center items-center w-full">
                                    <View className="m-2">
                                        <Button title="Historique de commandes" color="#713235" onPress={() => navigation.navigate('OrderHistory')}/>
                                    </View>
                                    <View className="m-2">
                                        <Button title="Se déconnecter" color="#713235" onPress={() =>handleLogOut(navigation)}/>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <View className="w-full md:w-2/3 flex flex-col items-center">
                            <View className="w-full mb-5">
                                <Text className="text-xl mb-2">Mot de passe actuel</Text>
                                <PasswordInput id={"motDePasseActuel"} onChangeTextFunction={setActualPassword}/>
                            </View>

                            <View className="w-full mb-10">
                                <Text className="text-xl mb-2">Nouveau mot de passe</Text>
                                <PasswordInput id={"motDePasseActuel"} onChangeTextFunction={setNewPassword}/>
                            </View>

                            <View className="w-full xl:w-1/2">
                                <Button title={"Modifier le mot de passe"}
                                        color={"#713235"}
                                        onPress={() => {
                                            resetPassword(
                                                actualPassword,
                                                newPassword,
                                                user.email
                                            )
                                        }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>
    );
};

export default Profile;
