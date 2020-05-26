import React ,{useState} from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert,TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1;
`;

const Text = styled.Text``;

export default ({navigation,route}) => {
    const emailInput = useInput(route.params?.email??"");
    const [loading, setLoading] = useState(false);
    const [requestSecretMutation] = useMutation(LOG_IN, {variables:{email:emailInput.value}});
    const handleLogin = async() =>{
        const {value} = emailInput;
        const emailRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(value===""){
            return Alert.alert("Email can't be empty");
        }else if(!emailRegex.test(value)){
            return Alert.alert("That email is invalid");
        }
        try{
            setLoading(true);
            console.log(`email:${emailInput.value}`);
            const  {data: {requestSecret}}= await requestSecretMutation();
            console.log(requestSecret);
            if(requestSecret){
                Alert.alert("Check your email");
                navigation.navigate("Confirm",{email:value});
            }else{
                Alert.alert("Account not found");
                navigation.navigate("Signup", {email:value})
            }
        }catch(e){
            console.log(e);
            Alert.alert("Can't login now");
        }finally{
            setLoading(false);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View>
                <AuthInput {...emailInput} placeholder="Email" keyboardType="email-address" returnKeyType={"send"} onSubmitEditing={handleLogin} autoCorrect={false}/>
                <AuthButton loading ={loading} text="Log in" onPress={handleLogin} />
            </View>
        </TouchableWithoutFeedback>
    );
}