import React from "react";
import styled from "styled-components";
import { ScrollView, Text } from "react-native";
import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";

const POST_DETAIL = gql`
    query seeFullPost($id:String!){
        seeFullPost(id:$id){
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;


export default ({navigation,route}) => {
    const {loading, data} = useQuery(POST_DETAIL,{variables:{id:route.params?.id}});
    console.log(data);
    return(
    <ScrollView>
        {loading? <Loader /> : data&&data.seeFullPost&& <Post {...data.seeFullPost}/>}
    </ScrollView>
    );
}