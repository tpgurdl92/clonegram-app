import React, {useState} from "react";
import { View} from "react-native";

import AuthNavigation from "../navigation/AuthNavigation";

import MainNavigation from "../navigation/MainNavigation";
import PhotoNavigation from "../navigation/PhotoNavigation";
import TabNavigation from "../navigation/TabNavigation";
import {useIsLoggedIn} from "../AuthContext";
export default () => {
    const isLoggedIn = useIsLoggedIn();
    

    console.log(isLoggedIn);
    return (
        <View style={{flex:1}}>
            {isLoggedIn &&
               <MainNavigation/>
            }
          
            {!isLoggedIn &&
                <AuthNavigation />
            }
        </View>
    );
    
}