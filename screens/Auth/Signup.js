import React ,{useState} from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert,TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';


const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1;
`;

const FBContainer= styled.View`
    margin-top:25px;
    padding-top: 25px;
    border-top-width: 1px;
    border-top-color:  ${props=>props.theme.lightGreyColor};
    border-style:solid;
`;

const GoogleContainer= styled.View`
    margin-top:25px;
    padding-top: 25px;
    border-top-width: 1px;
    border-top-color:  ${props=>props.theme.lightGreyColor};
    border-style:solid;
`;

const Text = styled.Text``;

export default ({navigation,route}) => {
    const fnameInput = useInput("");
    const lnameInput = useInput("");
    const usernameInput = useInput("");
    const emailInput = useInput(route.params?.email??"");
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT,{
        variables:{
            email:emailInput.value,
            username:usernameInput.value,
            firstName:fnameInput.value,
            lastName:lnameInput.value
        }});
        
    const handleSignup = async() =>{
        const {value: email} = emailInput;
        const {value: fname} = fnameInput;
        const {value: lname} = lnameInput;
        const {value: username} = usernameInput;
        console.log(email);
        console.log(fname);
        console.log(lname);
        console.log(username);
        const emailRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        if(fname===""){
            return Alert.alert("I need your name");
        }
        if(email===""){
            return Alert.alert("Email can't be empty");
        }else if(!emailRegex.test(email)){
            return Alert.alert("That email is invalid");
        }
        if(username ===""){
            return Alert.alert("Invalid username");
        }
        try{
            console.log("here 0");
            setLoading(true);
            console.log("here 1");
            const {data:{createAccount}}= await createAccountMutation();
            if(createAccount){
                Alert.alert("Account created", "Log in now!");
                navigation.navigate("Login",{email});
            }
        }catch(e){
            console.log(e);
            Alert.alert("Username taken.","Log in instead");
            navigation.navigate("Login", {email});
        }finally{
            setLoading(false);
        }
    };
    const fbLogin = async() => {
        try {
            setLoading(true);
            await Facebook.initializeAsync('191240968663423');
            const {
            type,
            token,
            } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile','email'],
            });
            if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`);
            const {email, first_name,last_name} = await response.json();
            emailInput.setValue(email);
            const [username] = email.split("@");
            usernameInput.setValue(username);
            fnameInput.setValue(first_name);
            lnameInput.setValue(last_name);
                
        } else {
            // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }finally{
            setLoading(false);
        }
          
    }
    const googleLogin = async() => {
        try {
            setLoading(true);
            const result = await Google.logInAsync({
              androidClientId: "544285325805-puq2t08mkfdrhoirltnev7na2uqnmja3.apps.googleusercontent.com",
              scopes: ['profile', 'email'],
            });
            if (result.type === 'success') {
                const {accessToken} = result;
                const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    });
                const {email,family_name,given_name,name} = await user.json();
                emailInput.setValue(email);
                usernameInput.setValue(name);
                fnameInput.setValue(given_name);
                lnameInput.setValue(family_name);

                
            } else {
              return { cancelled: true };
            }
          } catch (e) {
            console.log(e);
            return { error: true };

          }finally{
              setLoading(false);
          }
    }
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View>
            <AuthInput {...fnameInput} placeholder="First name" autoCapitalize="words"  autoCorrect={true}/>
                <AuthInput {...lnameInput} placeholder="Last name" autoCapitalize="words"  autoCorrect={true}/>
                <AuthInput {...emailInput} placeholder="Email" keyboardType="email-address" returnKeyType={"send"} autoCorrect={false}/>
                <AuthInput {...usernameInput} placeholder="Username" returnKeyType={"send"} onSubmitEditing={handleSignup} autoCorrect={false}/>
                <AuthButton loading ={loading} text="Sign up" onPress={handleSignup} />
                <FBContainer>
                    <AuthButton bgColor={"#2D4DA7"}loading={false} onPress={fbLogin} text="Connect Facebook" />
                </FBContainer>
                <GoogleContainer>
                    <AuthButton bgColor={"#EE1922"}loading={false} onPress={googleLogin} text="Connect Google" />
                </GoogleContainer>
            </View>
        </TouchableWithoutFeedback>
    );
}