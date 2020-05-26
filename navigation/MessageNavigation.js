import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages"
import stackStyles from "./config";
const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{headerStyle:{...stackStyles}}}>
            <Stack.Screen name="Message" component={Message}/>
            <Stack.Screen name="Messages" component={Messages}/>
        </Stack.Navigator>
    );
}