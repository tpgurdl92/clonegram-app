import React from "react";
import {Ionicons} from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const NavIcon = ({focused=true,name, size=26, color=styles.blackColor}) => <Ionicons name={name} size={size} color={focused?color:styles.darkGreyColor}/>

NavIcon.propTypes = {
    name:PropTypes.string.isRequired,
    size:PropTypes.number,
    color:PropTypes.string,
    focus:PropTypes.bool
}

export default NavIcon