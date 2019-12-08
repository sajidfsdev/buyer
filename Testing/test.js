import React from 'react';
import { View,Text,StyleSheet,Image,ScrollView } from 'react-native';

const Testing=(props)=>{

    //return statement starts here.....
    return (
        <React.Fragment>

            <ScrollView style={{flex:1}}>

            <View style={styles.scontainer}>

                {/* Top Title starts here... */}
                <View style={styles.stitleView}>
                    <Text style={styles.stitle}>Searching Nearby Rider</Text>
                </View>
                {/* Top title ends here..... */}


                {/* Image View Starts Here.... */}
                <View style={styles.simageView}>
                    <Image style={styles.simage} source={require('../assets/images/waves.gif')} />
                </View>
                {/* Image View Ends Here...... */}


            </View>

            </ScrollView>
        </React.Fragment>
    );
    //return statement end shere.......

}//.....................

const styles=StyleSheet.create({
    scontainer:{
        flex:1
    },


    simageView:{
        width:'100%',
        padding:5,
        marginTop:15
    },


    simage:{
        width:'100%',
        height:350
    },


    stitleView:{
        width:'100%',
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },

    stitle:{
        fontFamily:'roboto-regular',
        fontSize:24,
        color:"green"
    }
});

export default Testing;