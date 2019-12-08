import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Constants/Colors';
import Icons from '../Constants/Icons';


const Welcome=(props)=>{

   

    //return starts here....
    return (
        <View style={styles.container}>
            <View>
                <Icon name={Icons.logo} size={80} color={Colors.welcomeBack} />
            </View>

            <View>
                <Text style={{...styles.logoText,color:Colors.welcomeBack}}>HumRabt</Text>
            </View>
        </View>
    );
    //return ends here......

}//......................

const styles=StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    logoText:{
        fontSize:20,
        fontWeight:'bold'
        
    }
});

export default Welcome;