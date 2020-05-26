import React,{useState, useEffect} from "react";
import styled from "styled-components";
import {Image,View, ScrollView,Button,Text} from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainView = styled.View`
    
    margin-top:21px;
`;



export default ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [selected, setSelected] = useState();
    const [allPhotos, setAllPhotos] = useState();
    const changeSelected = (photo) => {
        console.log("photo");
        console.log(photo);
        setSelected(photo);
    }
    const getPhotos = async (photo) => {
        try{
            const {assets} = await MediaLibrary.getAssetsAsync();
            const [firstPhoto] = assets;
            console.log(`length :${assets.length}`);
            setAllPhotos(assets);
            setSelected(firstPhoto);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }
        
    const askPermission = async() => {
        try{
            setLoading(true);
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status==="granted"){
                setHasPermission(true);
                getPhotos();
            }
        }catch(e){
            console.log(e);
            setHasPermision(false);
        }finally{
            
        } 
    }
    const handleSelected = () => {
        navigation.navigate("UploadPhoto",{photo:selected});
    }
    useEffect(()=>{
        askPermission();
    },[])
    return (
        <MainView>
            {loading? 
                <Loader /> 
                : <View>{hasPermission?
                    (<>
                        <Image 
                            style={{width:constants.width, height:constants.height/2.5}} 
                            source={{uri:selected.uri}}/>
                        <Button title={"Select"} onPress={handleSelected}>
                        </Button>
                        <ScrollView style={{height:constants.height/3}} contentContainerStyle={{flexDirection:"row",flexWrap: 'wrap'}}>
                            {allPhotos.map(photo=>
                                <TouchableOpacity key={photo.id} onPress={()=>changeSelected(photo)}>
                                    <Image 
                                        style={{width:constants.width/3, 
                                            height:constants.height/5,
                                            opacity: photo.id===selected.id? 0.5: 1}}
                                        source={{uri:photo.uri}}
                                    />
                                </TouchableOpacity>)}
                        </ScrollView>
                    </>)
                    :null}
                </View>}
        </MainView>
    );
}