import React from "react";
import styled from "styled-components";
import {Platform} from "react-native"
import {TouchableOpacity,Text as OriginText} from "react-native";
import NavIcon from "./NavIcon"
import {useNavigation} from "@react-navigation/native";
import styles from "../styles";

const Container = styled(TouchableOpacity)`
    padding-right:20px;

`;
export default () => {
    
    const navigation = useNavigation();
    return (
        <Container onPress={()=>navigation.navigate("Message")}>
            <NavIcon name={Platform.OS==="ios"?"ios-paper-plane":"md-paper-plane"} color={styles.blackColor} />
        </Container>)
    }