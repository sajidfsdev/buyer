import React from 'react';
import { View,Text,StyleSheet,Button } from 'react-native';

const SignUpFail=(props)=>{

    //return starts here....
    return (
        <View>
            <Text>Your Account Has Been Registered!</Text>
            <Button title="Lets Login" color="green" />
        </View>
    );
    //return ends here......

}//...........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default SignUpFail;