
import 'react-native-gesture-handler';
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm"
import Login from "../screens/Auth/Login"
import AuthHome from "../screens/Auth/AuthHome"


const AuthNavigation = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <AuthNavigation.Navigator /*initialRouteName="AuthHome"*/ headerMode="none">
                <AuthNavigation.Screen name="AuthHome" component={AuthHome}/>
                <AuthNavigation.Screen name="Login" component={Login}/>
                <AuthNavigation.Screen name="Signup" component={Signup}/>
                <AuthNavigation.Screen name="Confirm" component={Confirm}/>
            </AuthNavigation.Navigator>
        </NavigationContainer>
    );
}