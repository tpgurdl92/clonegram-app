import React, { useState } from "react";
import styled from "styled-components";
import {Image,View,TouchableOpacity, Platform} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";

const ProfileHeader = styled.View`
    padding:20px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`;
const HeaderColumn = styled.View`
`;
const ProfileStats = styled.View`
    flex-direction:row;
`;
const Stat = styled.View`
    align-items:center;
    margin-left:40px;
`;
const Bold = styled.Text`
    font-weight:600;
`;
const StatName = styled.Text`
    margin-top:5px;
    font-size:12px;
    color:${styles.darkGreyColor};
`;
const ProfileMeta = styled.View`
    margin-top:10px;
    padding-left:20px;
`
const  Bio = styled.Text`

`;
const ButtonContatiner = styled.View`
    padding-vertical:5px;
    border: 1px solid ${styles.lightGreyColor};
    flex-direction:row;
    margin-top:15px;
`;
const Button = styled.View`
    width:${constants.width /2}px;
    align-items:center;
`;


const UserProfile = ({avatar,postsCount,followersCount,followingCount,bio,fullName,posts}) => {
    const [isGrid, setIsGrid] = useState(true);
    const toggleGrid = () => setIsGrid(!isGrid);
    return (
        <View>
            <ProfileHeader>
                    <Image style={{height:80, width:80, borderRadius:40}} source={{uri:avatar}}/>
                <HeaderColumn>
                    <ProfileStats>
                        <Stat>
                            <Bold>{postsCount}</Bold>
                            <StatName>Posts</StatName>
                        </Stat>
                        <Stat>
                            <Bold>{followersCount}</Bold>
                            <StatName>Followers</StatName>
                        </Stat>
                        <Stat>
                            <Bold>{followingCount}</Bold>
                            <StatName>Following</StatName>
                        </Stat>
                    </ProfileStats>
                </HeaderColumn>
            </ProfileHeader>
            <ProfileMeta>
                <Bold>{fullName}</Bold>
                <Bio>{bio}</Bio>
            </ProfileMeta>
            <ButtonContatiner>
                <TouchableOpacity onPress={toggleGrid}>
                    <Button>
                        <Ionicons 
                            color={isGrid ? styles.blackColor:styles.darkGreyColor}
                            size={32} 
                            name={Platform.OS==="ios"?"ios-grid":"md-grid"}
                        />
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleGrid}>
                    <Button>
                        <Ionicons 
                            color={!isGrid ? styles.blackColor:styles.darkGreyColor}
                            size={32} 
                            name={Platform.OS==="ios"?"ios-list":"md-list"}
                        />
                    </Button>
                </TouchableOpacity>
            </ButtonContatiner>
            {posts&&posts.map(post => (isGrid? <SquarePhoto key={post.id}{...post}/>:<Post key={post.id} {...post}/>))}
        </View>
    );
}

UserProfile.propTypes={
    
};

export default UserProfile;