import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/FontAwesome5';


const HeaderBtn=props=>{

    return (
        <HeaderButton {...props} IconComponent={Icon} iconSize={24} color="white" />
    );

}//........................

export default HeaderBtn;