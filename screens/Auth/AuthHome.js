import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1;
`;

const Image = styled.Image`
    width:${(constants.width/2.5)}px;
    margin-bottom:-150px;
`;
const Touchable =styled.TouchableOpacity``;
const LoginLink = styled.View`

`;
const LoginLinkText = styled.Text`
    color:${props=>props.theme.blueColor};
`;



export default ({navigation}) => (
    <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")}/>
        <AuthButton text={"Create New Account"} onPress={()=>navigation.navigate("Si")}/>
        <Touchable onPress={()=>navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log in</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);