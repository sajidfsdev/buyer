import React from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Ecternal depensencies...........(props)
//tostyles
//istyles
//iconSize
//iconColor



const SpinnerBtn=(props)=>{


    return (
        <TouchableOpacity style={{...props.tostyles}}  activeOpacity={0.5}>
            <Icon
                name="spinner"
                size={props.iconSize}
                color={props.iconColor}
            />
        </TouchableOpacity>
    );

}//..........................


export default SpinnerBtn;