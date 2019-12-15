import React from 'react';
import { View,Text,StyleSheet,ScrollView } from 'react-native';
import Color from '../../Constants/Colors';
import AutoHeightImage from 'react-native-auto-height-image';
import API from '../../Constants/API';

const HistoryDetails=(props)=>{

//compute History Bill starts here......
const computeHistoryBill=()=>{

    let bill=0;
    props.navigation.getParam('history').products.forEach(elem => {
        bill=bill+(elem.qty*elem.price);
        
    });
    return parseFloat(bill).toFixed(2);

}
//compute History Bill ends here........

    //return statement starts here.....
    return (
        <React.Fragment>
            <View style={styles.container}>
                
                {/* Title View Starts Here...... */}
                <View style={styles.parent}>
                        <View style={styles.child}>
                            <Text style={styles.title}>
                                {
                                    props.navigation.getParam("history").outletName.toUpperCase()
                                }
                            </Text>
                        </View>
                    </View>
                    {/* Title View Ends Here........ */}



                                    {/* Horizontal scroll View Starts Here....... */}
                <ScrollView style={styles.horizontalView} horizontal={true}>

{/* Products Details Starts Here..... */}
{
    props.navigation.getParam("history").products.map((elem,index)=>{
        return (
            <View key={index} style={styles.boxes}>
                <AutoHeightImage 
                    width={150}
                    source={
                       {
                           uri: API.server+"/vendor/prodimg/"+elem.imgArr[0]
                       }
                    }
                />
            <View style={{marginLeft:10}}>
                <Text style={styles.desc}>{"Name: "+elem.name}</Text>
                <Text style={styles.desc}>{"Price: "+elem.price+" Rs"}</Text>
                <Text style={styles.desc}>{"Qty: "+elem.qty}</Text>
                <Text style={styles.desc}>{"Total: "+(elem.qty*elem.price)+" Rs"}</Text>
            </View>
            </View>
        );
    })
}
{/* Products Details Ends Here.......... */}
</ScrollView>
{/* Horizontal Scroll View Ends Here.......... */}



                    {/* Grand total view starts here....... */}
                    <View style={styles.gtView}>
                        <View style={styles.gtChild}>
                            <Text style={styles.gtText}>
                                {
                                    "Grand Total: Rs "+computeHistoryBill()
                                }
                            </Text>
                        </View>
                    </View>
                    {/* Grand total View ends here......... */}




            </View>
        </React.Fragment>
    );
    //return statement ends here.......

}//..............................

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    parent:{
        width:'100%',
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },

    child:{
        padding:5,
        borderWidth:1,
        borderColor:Color.welcomeBack
    },

    title:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.welcomeBack
    },
    horizontalView:{
        width:'100%',
        marginTop:30
    },
    desc:{
        fontFamily:'roboto-regular',
        fontSize:12
    },

    gtView:{
        width:'100%',
        padding:5,
        marginTop:2,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },

    gtChild:{
        padding:5,
        backgroundColor:Color.primary,
        justifyContent:'center',
        alignItems:'center'
    },

    gtText:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    }
});

export default HistoryDetails;