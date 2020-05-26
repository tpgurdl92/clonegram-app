import React, { useEffect } from "react";
import {ScrollView} from "react-native";
import styled from "styled-components";
import {gql} from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";
import {USER_FRAGMENT} from "../../fragments";
const ME = gql`
    {
        me{
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;



const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1;
`;

const Text = styled.Text``;

export default () => {
    const {loading, data} = useQuery(ME);
    
    return (
        <ScrollView>
            {loading? <Loader/>:data&&data.me&&<UserProfile {...data.me}/>}
        </ScrollView>
    );
}