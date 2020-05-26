
import 'react-native-gesture-handler';
import React from "react";
import {Platform} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import styled from "styled-components";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import PhotoNavigation from "./PhotoNavigation";
import MessaagesLink from '../components/MessaagesLink';
import NavIcon from '../components/NavIcon';
import { stackStyles } from './config';
import Detail from '../screens/Detail';
import styles from '../styles';
import UserDetail from '../screens/UserDetail';


const Image = styled.Image`
    height:35px;
    width:auto;
`;

const TabNavigation = createBottomTabNavigator();

const stackFactory = (stackName) => {
    const Stack = createStackNavigator();
    if(stackName==="Home"){
        return (
            <Stack.Navigator  >
                <Stack.Screen name="Home" component={Home} options={{headerStyle:{...stackStyles},headerTitleAlign:()=>"center",headerTitle:()=><NavIcon size={32} name="logo-instagram"/> ,headerRight:()=>(<MessaagesLink/>)}} />
            </Stack.Navigator>
        );
    }else if(stackName==="Search"){
        return (
            <Stack.Navigator  >
                <Stack.Screen name="Search" component={Search}  />
                <Stack.Screen name="Detail" component={Detail} options={{headerTitle:"Photo",headerStyle:{...stackStyles},headerTitleAlign:()=>"center",headerTintColor:styles.blackColor}} />
                <Stack.Screen name="UserDetail" component={UserDetail} options={({route})=>({headerTitle:route.params?.username,headerStyle:{...stackStyles},headerTitleAlign:()=>"center",headerTintColor:styles.blackColor})}/>
            </Stack.Navigator>
        );
    }
}
export default () => {
    
    return (
            
            <TabNavigation.Navigator initialRouteName="Home" tabBarOptions={{showLabel:false,style:{backgroundColor:{...stackStyles}}}} >
                <TabNavigation.Screen name="Search" children={()=>stackFactory("Search")} options={{headerStyle:{stackStyles},headerTitle:()=><NavIcon size={32} name="logo-instagram"/> ,headerRight:()=>(<MessaagesLink/>),tabBarIcon:({focused})=><NavIcon focused={focused}name={Platform.OS==="ios"?"ios-search":"md-search"}/>}}/>
                <TabNavigation.Screen name="Home" children={()=>stackFactory("Home")} options={{tabBarIcon:({focused})=><NavIcon focused={focused} name={Platform.OS==="ios"?"ios-home":"md-home"}/>}} />
                <TabNavigation.Screen name="Notifications" component={Notifications} options={{tabBarIcon:({focused})=><NavIcon focused={focused} name={Platform.OS==="ios"?focused?"ios-heart":"ios-heart-empty":focused?"md-heart":"md-heart-empty"}/>}}/>
                <TabNavigation.Screen name="addPost" component={PhotoNavigation} options={{tabBarIcon:({focused})=><NavIcon focused={focused} name={Platform.OS==="ios"?"ios-add":"md-add"}/>}}/>
                <TabNavigation.Screen name="Profile" component={Profile} options={{tabBarIcon:({focused})=><NavIcon focused={focused} name={Platform.OS==="ios"?"ios-person":"md-person"}/>}}/>
            </TabNavigation.Navigator>
           
    );
}