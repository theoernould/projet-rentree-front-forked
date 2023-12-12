import React, { useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {useApplicationContext} from "../contexts/AuthContext";
import PasswordInput from "../components/PasswordInput";

export default function Authentification({ navigation }) {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const { tryLogIn, trySignIn, sendPasswordResetEmail } = useApplicationContext();

    return (
        <View className="flex-1 justify-center items-center px-2">
            <View className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center bg-white shadow-xl">
                <Text className="text-5xl font-bold mb-10 text-center">{login ? 'Se connecter' : 'Créer un compte'}</Text>
                <View className="w-full">
                    {login ? null : <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Prénom" onChangeText={setFirstname}/>}
                    {login ? null : <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Nom" onChangeText={setLastname}/>}
                    {login ? null : <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Adresse" onChangeText={setAddress}/>}
                    <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Adresse mail" onChangeText={setEmail}/>
                    <PasswordInput id={"motDePasseActuel"} onChangeTextFunction={setPassword} placeholder="Mot de passe"/>

                    <View className="my-5">
                        <Button color="#713235"
                                title={login ? 'Connexion' : 'Je crée mon compte'}
                                onPress={login ? () => tryLogIn(email, password, navigation) : async () => {
                                    const res = await trySignIn(email, password, firstname, lastname, address)
                                    setLogin(res);
                                }}
                        />
                    </View>

                    <Text className="mb-2 text-[#713235] text-center" onPress={() => setLogin(!login)}>
                        {login ? "Créer un compte" : 'J\'ai déja un compte'}
                    </Text>

                    {login && (
                        <Text className="text-[#713235] text-center" onPress={() => sendPasswordResetEmail(email)}>
                            Mot de passe oublié ?
                        </Text>
                    )}

                </View>
            </View>
        </View>
    );
}

