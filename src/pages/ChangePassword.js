import {useApplicationContext} from "../contexts/AuthContext";
import React from "react";
import PasswordInput from "../components/PasswordInput";
import {Button, Text, View} from "react-native";

const ChangePassword = () => {

    const { changePassword } = useApplicationContext();

    return (
        <View className="flex-1 justify-center items-center">
            <View className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center bg-white shadow-xl">
                <Text className="text-3xl font-bold mb-10">Changement de mot de passe</Text>
                <View className="w-full">

                    <View className="mb-5">
                        <Text className="text-xl">Nouveau mot de passe</Text>
                        <PasswordInput id={"newPassword"} placeholder=""/>
                        <Text className="text-xl">Confirmer le nouveau mot de passe</Text>
                        <PasswordInput id={"confirmPassword"} placeholder=""/>
                    </View>


                    <Button id="changePassword"
                            title="Confirmer"
                            color="#713235"
                            onPress={() => changePassword(
                                document.getElementById("newPassword").value,
                                document.getElementById("confirmPassword").value,
                                new URLSearchParams(window.location.search).get('token')
                            )
                    }/>
                </View>
            </View>
        </View>
    );
};

export default ChangePassword;
