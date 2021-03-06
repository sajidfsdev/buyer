import React,{ useState } from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//changing import starts...
import Color from '../Constants/Colors';


const Testing=(props)=>{

    //ratigs state management starts here....
    const [ratings,setRatings]=useState(3);
    //ratings state management ends here......



    const ratingCompleted=(rat)=>{
        setRatings(rat);
      }

    

    //return starts here....
    return (
        <React.Fragment>
            <View style={styles.container}>
                
                <View style={styles.titleView}>
                    <Text style={styles.title}>PRODUCT DELIVERED</Text>
                </View>

                <View>
                    <Icon 
                        name="wallet-giftcard"
                        size={120}
                        color="purple"
                    />
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>RATE RIDER</Text>
                </View>
            
                    <Rating
                    showRating
                    onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 10 }}
                    />


                    {/* Go Back Button Starts Here..... */}
                    <TouchableOpacity style={styles.to} activeOpacity={0.5}>
                        <Text style={styles.toText}>
                            GO BACK
                        </Text>
                    </TouchableOpacity>
                    {/* Go Back Button Ends Here....... */}
            </View>
        </React.Fragment>
    );
    //return ends here......

}//........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20
    },

    to:{
        width:'100%',
        padding:15,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.success
    },

    toText:{
        fontFamily:'roboto-regular',
        fontSize:12,
        color:'white'
    },

    titleView:{
        width:'100%',
        padding:20,
        justifyContent:'center',
        alignItems:'center'
    },

    title:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.success,
        fontWeight:'bold'
    }
});

export default Testing;