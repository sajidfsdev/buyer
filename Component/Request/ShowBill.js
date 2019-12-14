import React from 'react';
import { View,Text,StyleSheet,ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Color from '../../Constants/Colors';

const ShowBill=(props)=>{

    //redux state starts........
    const request_RP=useSelector(state=>state.request.request);


    //compute grand total starts here......
    const computeGrandTotal=()=>{
        const distanceCovered=parseFloat(request_RP.distance/1000).toFixed(2);
        const perKmRate=request_RP.fare.distance;
        const distanceFare=parseFloat(distanceCovered*perKmRate);
        let additionalFares=0;
        request_RP.fare.fares.forEach(elem => {
            additionalFares+=elem.value;
        });

        return parseInt(distanceFare+additionalFares);
    }
    //compute Grand total ends here........

    //return starts here......
    return (
        <React.Fragment>
            <ScrollView style={styles.container}>
                
                {/* Pay Fare Starts Here..... */}
                <View style={styles.fareContainer}>
                    <View style={styles.fareBlock}>
                        <Text style={styles.fareTitle}>PAY FARE AMOUNT</Text>
                    </View>
                </View>
                {/* Pay Fare Ends Here....... */}



                {/* Strip Starts Here... */}
                <View style={styles.stripBlue}>
                    <Text style={styles.stripText}>Distance</Text>
                    <Text style={styles.stripText}>{
                        parseFloat(request_RP.distance/1000).toFixed(2)+" Km"
                    }</Text>
                </View>
                {/* Strip Ends Here..... */}


                {/* Strip Starts Here... */}
                <View style={styles.stripBlue}>
                    <Text style={styles.stripText}>Per-Km Rate</Text>
                    <Text style={styles.stripText}>{
                        request_RP.fare.distance+" Rs"
                    }</Text>
                </View>
                {/* Strip Ends Here..... */}

                {/* Strip Starts Here... */}
                <View style={styles.strip}>
                    <Text style={styles.stripText}>Distance Fare</Text>
                    <Text style={styles.stripText}>
                        {
                             (parseFloat(request_RP.distance/1000).toFixed(2))*(request_RP.fare.distance)+" Rs"
                        }
                    </Text>
                </View>
                {/* Strip Ends Here..... */}

                {/* Further Rates Starts Here...... */}
                {
                    request_RP.fare.fares.map((elem,index)=>{
                        return (
                            <View key={index} style={styles.strip}>
                                <Text style={styles.stripText}>
                                    {elem.fare}
                                </Text>
                            <Text style={styles.stripText}>
                                {elem.value}
                            </Text>
                        </View>
                        );
                    })
                }
                {/* Further Rates Ends Here........ */}



                {/* Grand Total Starts Here....... */}
                <View style={styles.gtParent}>
                    <View style={styles.getChild}>
                        <Text style={styles.gt}>
                            {
                                "GRAND TOTAL: Rs "+computeGrandTotal()
                            }
                        </Text>
                    </View>
                </View>
                {/* Grand Total Ends Here......... */}

            </ScrollView>
        </React.Fragment>
    );
    //return ends here........

}//........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:20,
        paddingRight:20
    },


    fareContainer:{
        width:'100%',
        padding:2,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },

    fareBlock:{
        padding:10,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'green'
    },

    fareTitle:{
        fontFamily:'roboto-regular',
        color:'green',
        fontSize:18
    },

    strip:{
        width:'100%',
        marginTop:20,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'green'
    },

    stripText:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    },

    stripBlue:{
        width:'100%',
        marginTop:20,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:Color.welcomeBack
    },

    gtParent:{
        width:'100%',
        marginTop:20,
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:3
    },

    getChild:{
        padding:10,
        backgroundColor:'green',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },

    gt:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'white'
    }
});

export default ShowBill;