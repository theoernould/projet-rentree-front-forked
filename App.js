import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Menu from './src/pages/Menu';
import DishDetail from './src/pages/DishDetail';
import OrderCompleted from './src/pages/OrderCompleted';
import Basket from './src/pages/Basket';
import Profile from './src/pages/Profile';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentification from './src/pages/Authentification';
import Error from './src/pages/Error';
import Header from './src/components/Header';
import { AuthContextProvider} from "./src/contexts/AuthContext";

import axios from 'axios';
import OrderHistory from "./src/pages/OrderHistory";
import ChangePassword from "./src/pages/ChangePassword";
import { enableScreens } from 'react-native-screens';
import store from "./store";
import { Provider } from 'react-redux'
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
    default: "native",
});


const Stack = createNativeStackNavigator();
const linking = {
    prefixes: ['https://localhost:19006'],
    config: {
        screens: {
            Authentification: 'Authentification',
            ChangePassword: 'ChangePassword',
            Error: 'Error',
            Menu: '',
            DishDetail: 'DishDetail',
            OrderCompleted: 'OrderCompleted',
            OrderHistory: 'OrderHistory',
            Basket: 'Basket',
            Profile: 'Profile'
        },
    },
};
const App = () => {
    enableScreens();

    axios.defaults.withCredentials = true;

    return (

        <Provider store={store}>
            <AuthContextProvider>
                <NavigationContainer linking={linking}>
                  <Stack.Navigator
                      screenOptions={{
                          headerStyle: { backgroundColor: '#FFFFFF'},
                        }} >
                            <Stack.Screen name="Error" component={Error} options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="ChangePassword" component={ChangePassword}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="Authentification" component={Authentification} options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="Menu" component={Menu} options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="DishDetail" component={DishDetail} options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="OrderCompleted" component={OrderCompleted}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="Basket" component={Basket} options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="Profile"  component={Profile}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                        </Stack.Navigator>
                </NavigationContainer>
            </AuthContextProvider>
        </Provider>


  );
};


export default App;