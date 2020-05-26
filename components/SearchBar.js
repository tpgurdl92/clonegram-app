import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {TextInput} from "react-native";
import constants from "../constants";
import styles from "../styles";

const SearchBar = ({onChange=()=>null, value, onSubmit=()=>null}) => {
    
    return (
        <TextInput  style={{width:constants.width - 40,height:35,backgroundColor:styles.lightGreyColor,padding:10,borderRadius:5,textAlign:"center"}} 
            value={value} onChange={(e)=>{onChange(e.nativeEvent.text)}} placeholder="Search" placeholderTextColor={styles.darkGreyColor}/>
    );
}

SearchBar.propTypes = {
    onChange:PropTypes.func.isRequired,
    value:PropTypes.string,
    onSubmit:PropTypes.func,
}

export default SearchBar;