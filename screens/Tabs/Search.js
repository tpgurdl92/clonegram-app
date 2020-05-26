import React,{useState} from "react";
import styled from "styled-components";
import {gql} from "apollo-boost";
import {useQuery} from "react-apollo-hooks";
import {ScrollView, RefreshControl} from "react-native"
import SearchBar from "../../components/SearchBar";
import useInput from "../../hooks/useInput";
import Loader from "../../components/Loader";
import SquarePhoto from "../../components/SquarePhoto";

const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1;
`;

const Text = styled.Text``;

const SEARCH= gql`
    query($term:String!, $action:ACTIONS!){
        searchPost(term:$term, action:$action){
            id, 
            files{
                id
                url
            },
            location,
            caption,
            user{
                id
                username
                avatar
                amIFollowing
            },
            comment{
                id
                text
                user{
                    id
                    avatar
                    username
                }
                createdAt
            },
            isLiked,
            likeCount,
            createdAt,
            updatedAt,
            commentCount,
        }
        
    }
`;



export default ({navigation})=>{
    const searchInput = useInput("");
    const [refreshing, setRefreshing] = useState(false);
    const {data, loading,refetch} = useQuery(SEARCH,{
        skip:(searchInput.value ===""||searchInput.value===undefined),
        variables:{
            term:searchInput.value,
            action:"TERM"
        },
        fetchPolicy:"network-only"
    });
    const onRefresh = async() => {
        try{
            setRefreshing(true);
            await refetch();
        }catch(e){
            console.log(e);
        }finally{
            setRefreshing(false)
        }
    }

    navigation.setOptions({
        headerTitle: ()=><SearchBar {...searchInput}/>
        ,headerTitleAlign:()=>"center"
      });
    
    return(<ScrollView refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}>
                {loading? <Loader /> :data&&data.searchPost&&data.searchPost.map(post=><SquarePhoto navigation ={navigation} key={post.id} {...post}/>)}
         </ScrollView>);
}
