import React ,{useState} from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert,TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CONFIRM_SECRET } from "./AuthQueries";
import { useLogUserIn } from "../../AuthContext";

const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1;
`;

const Text = styled.Text``;

export default ({navigation, route}) => {
    const confirmInput = useInput("");
    const logIn= useLogUserIn();
    const [loading, setLoading] = useState(false);
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET,
        {variables:{
            secret:confirmInput.value,
            email:route.params?.email
        }});
    const handleConfirm = async() =>{
        const {value} = confirmInput;
        if(value===""||!value.includes(" ")){
            return Alert.alert("Invalid secret");
        }
        try{
            setLoading(true);
            const {data :{confirmSecret}} = await confirmSecretMutation();
            if(confirmSecret!==""||confirmSecret!==false){
                logIn(confirmSecret);
            }else{
                return Alert.alert("Wrong secret!");
            }
        }catch(e){
            console.log(e);
            Alert.alert("Can't confirm secret ");
        }finally{
            setLoading(false);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View>
                <AuthInput {...confirmInput} placeholder="Secret"  returnKeyType={"send"} onSubmitEditing={handleConfirm} autoCorrect={false}/>
                <AuthButton loading ={loading} text="Confirm" onPress={handleConfirm} />
            </View>
        </TouchableWithoutFeedback>
    );
}