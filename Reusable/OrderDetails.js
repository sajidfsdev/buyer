import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity, Alert } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Color from '../Constants/Colors';
import API from '../Constants/API';

//props.request
//props.back

const OrderDetailsView=(props)=>{


    const [appState,setAppState]=useState(1);//1 normal 2..loading



    //Compute Bill Starts Here......
    const computeBill=()=>{
        let bill=0;
        props.request.products.forEach(element => {
                bill=parseInt(bill+(element.qty*element.price))
        });
        return bill;
    }
    //Compute Bill Ends Here........


    //Main GUI man starts here.........
    let mainGUI=null;

        mainGUI=(
            <React.Fragment>
                <ScrollView style={styles.container}>
                
                {/* Title View Starts Here...... */}
                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        Order Details
                    </Text>
                </View>
                {/* Title View Ends Here........ */}


                


                {/* Item Number Show Starts.... */}
                <View style={styles.subTitleView}>
                    <Text style={styles.subTitle}>{"Order Contains "+props.request.products.length+" Item"}</Text>
                </View>
                {/* Item Number Show ends ..... */}



                {/* Horizontal scroll View Starts Here....... */}
                <ScrollView style={styles.horizontalView} horizontal={true}>

                    {/* Products Details Starts Here..... */}
                    {
                        props.request.products.map((elem,index)=>{
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


                {/* Bill View Starts Here........ */}
                <View style={styles.parentBillView}>
                        <View style={styles.billView}>
                            <Text style={styles.bill}>{"Bill: "+computeBill()+" Rs"}</Text>
                        </View>
                </View>
                {/* Bill View Ends Here.......... */}



                {/* Received Cash Button starts here....... */}
                <TouchableOpacity onPress={props.back} style={styles.to} activeOpacity={0.5}>
                    <Text style={styles.toText}>GO BACK</Text>
                </TouchableOpacity>
                {/* Received Cash Button Ends Here......... */}

            </ScrollView>
            </React.Fragment>
        );
    
    //Main GUI man ends here...........

    //return starts here.....
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here......

}//.......................

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:20,
        paddingRight:20
    },

    titleView:{
        width:'100%',
        padding:5,
        flexDirection:'row',
        justifyContent:'flex-start'
    },


    title:{
        fontFamily:'roboto-regular',
        fontSize:20,
        color:'green'
    },

    horizontalView:{
        width:'100%'
    },


    boxes:{
       
    },

    subTitleView:{
        width:'100%',
        padding:5,
        flexDirection:'row',
        justifyContent:'flex-start'
    },

    subTitle:{
        fontFamily:'roboto-regular',
        fontSize:15
    },

    desc:{
        fontFamily:'roboto-regular',
        fontSize:12
    },

    parentBillView:{
        width:'100%',
        marginTop:30,
        flexDirection:'row',
        justifyContent:'flex-end'
    },

    billView:{
        padding:10,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.welcomeBack
    },


    bill:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    },

    to:{
        width:'100%',
        padding:15,
        marginTop:20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.success
    },

    toText:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    },

    orderIdView:{
        width:'100%',
        padding:3,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },


    orderId:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.welcomeBack
    }
});

export default OrderDetailsView;