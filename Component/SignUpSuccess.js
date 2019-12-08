import React from 'react';
import { View,Text,StyleSheet,Button } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Color from '../Constants/Colors';

const SignUpSuccess=(props)=>{

   

    //return starts here....
    return (
        <View style={styles.container}>
            <Icons name="check-circle" size={50} color={Color.success} />
            <View style={styles.padding}></View>
            <Text>Your Account Has Been Registered!</Text>
            <View style={styles.padding}></View>
            <Button onPress={()=>{props.navigation.navigate('signin')}} title="Lets Login" color={Color.success} />
        </View>
    );
    //return ends here......

}//...........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },


    padding:{
        padding:5
    }
});

export default SignUpSuccess;