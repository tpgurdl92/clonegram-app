import React, { useState } from "react";
import {Image} from "react-native"
import styled from "styled-components";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import {gql} from "apollo-boost";
import {Ionicons} from "@expo/vector-icons";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";


const TOGGLE_LIKE = gql`
    mutation toggleLike($postId:String!){
        toggleLike(postId:$postId)
    }
`;

const Container = styled.View`
`;

const Header = styled.View`
    padding:15px;
    flex-direction:row;
    align-items:center;
    padding:10px;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
    margin-left:10px;
`;
const Bold = styled.Text`
    font-weight:500;
    
`;
const Location = styled.Text`
    font-size:12px;
`;
const IconsContainer = styled.View`
    flex-direction:row;
    padding-left: 10px;
`;
const IconContainer = styled.View`
    margin-right:10px;
`;
const InfoContainer = styled.View`
    padding-left:10px;
`;
const Caption= styled.Text`
    margin:3px 0px;
`;
const CommentCount = styled.Text`
    margin-top:5px;
    opacity:0.5;
    font-size:12px;
`;

const Post = ({id,user,files=[],location="",likeCount:likeCountProp,caption,comment=[],isLiked:isLikedProp,navigation}) => {
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [likeCount, setLikeCount] = useState(likeCountProp);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE,{variables:{postId:id}});
    const handleLike = async() => {
        try{
            if(isLiked){
                setLikeCount(l =>l-1);
            }else{
                setLikeCount(l =>l+1);
            }
            setIsLiked(p=>!p);
            await toggleLikeMutation();
        }catch(e){
            console.log(e);
        }
    }
    console.log(files);
    return (
        <Container>

            <Header>
                <Touchable onPress={()=>navigation.navigate("UserDetail",{username:user.username})}>
                    <Image style={{height:40,width:40,borderRadius:20}} source={{uri:user.avatar}}/>
                </Touchable>
                <Touchable onPress={()=>navigation.navigate("UserDetail",{username:user.username})}>
                    <HeaderUserContainer >
                        <Bold>{user.username}</Bold>
                        <Location>{location}</Location>
                    </HeaderUserContainer>
                </Touchable>
                </Header>
                <Swiper  style={{height:constants.height /2.5 +15}}>
                    {files.map(file=><Image style={{width:constants.width, height:constants.height/2.5}}key={file.id} source={{uri:file.url}} />)}       
                </Swiper>
                <IconsContainer>
                    <Touchable onPress={handleLike}>
                        <IconContainer>
                            <Ionicons color={isLiked? styles.redColor:styles.blackColor}size={28 }name={Platform.OS === "ios"?isLiked?"ios-heart":"ios-heart-empty":isLiked?"md-heart":"md-heart-empty"} />
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                            <Ionicons size={28 }name={Platform.OS === "ios"?"ios-text":"md-text"} />
                        </IconContainer>
                    </Touchable>
                </IconsContainer>
                <InfoContainer>
                <Touchable>
                    <Bold>{likeCount===1? "1 like": `${likeCount} likes`}</Bold>
                </Touchable>
                <Caption><Bold>{user.username}</Bold>{"  "+caption}</Caption>
                <Touchable>
                    <CommentCount>See all {comment.length} comments</CommentCount>
                </Touchable>
                </InfoContainer>
        </Container>);
}


Post.propTypes={
    id :PropTypes.string.isRequired,
    user :PropTypes.shape({
        id:PropTypes.string.isRequired,
        avatar:PropTypes.string,
        username:PropTypes.string.isRequired,
    }).isRequired,
    files :PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        url:PropTypes.string.isRequired
    })).isRequired,
    likeCount :PropTypes.number.isRequired,
    isLiked :PropTypes.bool.isRequired,
    comment :PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        text:PropTypes.string.isRequired,
        user:PropTypes.shape({
            id:PropTypes.string.isRequired,
            username:PropTypes.string.isRequired,
        }).isRequired,
    })),
    createdAt :PropTypes.string.isRequired,
    caption:PropTypes.string.isRequired,
    location:PropTypes.string.isRequired,
}

export default Post;