import React from 'react';
import { View,Image,StyleSheet,Text } from 'react-native';

const AppLoading=(props)=>{

    return (
        <View style={styles.container}>
            <Image style={styles.spinner} resizeMode="center" source={require("../assets/images/appLoading.gif")} />
            <Text>Please Wait </Text>
        </View>
    );

}//.........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    spinner:{
        width:150,
        height:150
    }
});

export default AppLoading;