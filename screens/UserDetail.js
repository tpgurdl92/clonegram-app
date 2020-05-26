import React from "react";
import styled from "styled-components";
import { ScrollView, Text } from "react-native";
import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import {USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
    query seeUser($username:String!){
        seeUser(username:$username){
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;


export default ({navigation,route}) => {
    const {loading, data} = useQuery(GET_USER,{variables:{username:route.params?.username}});
    console.log("route");
    console.log(data);
    return(
    <ScrollView>
        {loading? <Loader /> : data&&data.seeUser&& <UserProfile {...data.seeUser}/>}
    </ScrollView>
    );
}