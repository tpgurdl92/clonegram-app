import React, { useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createStackNavigator} from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import {NavigationContainer} from "@react-navigation/native";
import styles from "../styles";
import { stackStyles } from "./config";
import { TabBar } from "react-native-tab-view";

const PhotoNavigation = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const basePhotoNavi =() => {
    return(
        <PhotoNavigation.Navigator  tabBarOptions={{indicatorStyle:{backgroundColor:styles.blackColor},labelStyle:{fontWeight:"600"},style:{backgroundColor:{...stackStyles},top:20}}}>
            <PhotoNavigation.Screen name="SelectPhoto" component={SelectPhoto} />
            <PhotoNavigation.Screen name="TakePhoto" component={TakePhoto}   />
        </PhotoNavigation.Navigator>

    );
}
export default () => (
    <Stack.Navigator  >
        <Stack.Screen name="TakePhoto" children={basePhotoNavi} options={{headerShown:false}} />
        <Stack.Screen name="UploadPhoto"  component={UploadPhoto} options={{headerShown:true,headerTitle:"Upload"}} />
    </Stack.Navigator>
);
const hideTab = { height: 0, padding: 0, margin: 0 }