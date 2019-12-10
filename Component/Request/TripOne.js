import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,Dimensions,Button,TextInput,Alert } from 'react-native';
import MapView,{ PROVIDER_GOOGLE,Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useSelector,useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Linking } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import MapKey from '../../Constants/Maps';
import axios from 'axios';
import AppLoading from '../../Reusable/AppLoading';
import API from '../../Constants/API';
import * as Types from '../../Store/Types/Request';
import * as Actions from '../../Store/Actions/Request';

const TripOneView=(props)=>{

    const dispatch=useDispatch();

    //state management starts here.....
    const [mapRef,setMapRef]=useState();
    const [appState,setAppState]=useState(1);//1 TRIP ONE
                                            //2 loading
                                            //3 Rider Reached
    const [codeState,setCodeState]=useState(null);
    const [enteredCodeState,setEnteredCodeState]=useState("");
    //state management ends here.......

    //redux state starts here.....
    const latitude_RP=useSelector(state=>state.request.latitude);
    const longitude_RP=useSelector(state=>state.request.longitude);
    const request_RP=useSelector(state=>state.request.request);
    const token_RP=useSelector(state=>state.auth.token);
    //redux state ends here.......


    //Handle coe validation starts here.........
    const handleCodeValidation=async ()=>{

        if(codeState===enteredCodeState)
        {
            //sending HTTP Request starts......
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'b-auth-humtoken':token_RP
                }
            };

            const body=JSON.stringify({
                requestId:request_RP._id
            });

            //try catch starts here.....
            try
            {
                const res=await axios.post(API.server+"/buyer/request/approveCode",body,config);

                if(res)
                {
                    
                    dispatch(Actions.handleUpdateCompleteRequestStatus("RECEIVECASH"));
                    
                }
                else
                {
                    Alert.alert("Failed","Network Error");
                }
            }
            catch(err)
            {
                if(err.response)
                {
                    Alert.alert("Failed",err.response.data.errorMessage);
                }
                else
                {
                    Alert.alert("Failed",err.message);
                }
            }
            //try catch ends here.......

            //sending HTTP Request ens here....
        }
        else
        {
            Alert.alert("Code Authentication Failed");
        }
    }
    //Handle code validation ends here..........


    //Handle Cancel Ride Starts....
    const handleControlBuyerReached=async ()=>{
        setAppState(2);

        //config starts here.....
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };

        //body starts......
        const body=JSON.stringify({
            requestId:request_RP._id
        });

        //try catch starts here.....
        try
        {
            const res=await axios.post(API.server+"/buyer/request/riderCome",body,config);

            if(res)
            {
                setAppState(3);
                setCodeState(res.data.code);
                //setEnteredCodeState(res.data.code);
            }
            else
            {
                setAppState(1);
                Alert.alert("NETWORK ERROR");
            }
        }
        catch(err)
        {
            setAppState(1);
            if(err.response)
            {
                Alert.alert("ERROR",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("ERROR",err.message);
            }
        }
        //try catch ends here.......
    }
    //Handle Cancel Ride Ends......

    //Handle entered code state......
    const handleEnteredCodeChange=(enteredCode)=>{
        setEnteredCodeState(enteredCode);
    }
    //Handle enetre code state ends here....


    //Handle Phone Call starts here......
    const handlePhoneCall=()=>{
        const str="tel:"+request_RP.buyerPh;
        Linking.openURL(str);
    }
    //Handle Phone Call ends here........


    //Handle return to map.............
    const handleReturnToMap=()=>{
        mapRef.animateToRegion({
            latitude:parseFloat(latitude_RP),
            longitude:parseFloat(longitude_RP),
            latitudeDelta:0.045,
            longitudeDelta:0.045
        },1000);
    }
    //handle return to map ends here...


    //Main GUI man starts here........
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                        <ScrollView style={styles.container}>
            
            {/* Title View Starts Here..... */}
            <View style={styles.titleView}>
                <View style={styles.box}>
                    <Text style={styles.title}>RIDER IS COMMING</Text>
                </View>
            </View>
            {/* Title View Ends Here....... */}


            {/* Map View starts here..... */}
            <View style={styles.mapView}>
                <MapView 
                    provider={PROVIDER_DEFAULT}
                    ref={(map)=>{setMapRef(map)}}
                    style={styles.map}
                    showsCompass={true}
                    showsUserLocation={true}
                    rotateEnabled={true}
                    region={{
                        latitude:parseFloat(latitude_RP),
                        longitude:parseFloat(longitude_RP),
                        latitudeDelta:0.045,
                        longitudeDelta:0.045
                    }}
                >
                    {/* Marker section starts here.... */}
                    <Marker
                        title="ME"
                        coordinate={{
                            latitude:parseFloat(latitude_RP),
                            longitude:parseFloat(longitude_RP)
                        }}
                    >
                        <Icon name="person-pin-circle" size={40} color="green" />
                    </Marker>


                    <Marker
                        title="RIDER"
                        coordinate={{
                            latitude:parseFloat(request_RP.riderLat),
                            longitude:parseFloat(request_RP.riderLong)
                        }}
                    >
                        <Icon name="directions-bike" size={40} color="#120d6e" />
                    </Marker>
                    {/* Marker Section ends here...... */}


                    {/* Polyline starts here...... */}
                    <MapViewDirections
                    apikey={MapKey.apikey}
                    origin={{latitude:parseFloat(latitude_RP),longitude:parseFloat(longitude_RP)}}
                    destination={{latitude:parseFloat(request_RP.riderLat),longitude:parseFloat(request_RP.riderLong)}}
                    strokeWidth={7}
                    strokeColor="hotpink"
                    />
                    {/* Polyline ends here........ */}

                </MapView>
            </View>
            {/* Map View ends here....... */}


            {/* Bottom Info View starts here.... */}
            <View style={styles.buyerInfoView}>
                    
                    {/* Buyer Name View Starts.... */}
                    <View style={styles.nameView}>
                        <Text style={styles.nameTitle}>Rider's Name</Text>
                        <Text style={styles.name}>{request_RP.riderName}</Text>
                    </View>
                    {/* Buyer Name View Ends...... */}

                    {/* Buyer PH View Starts.... */}
                    <View style={styles.nameView}>
                        <Text style={styles.nameTitle}>{request_RP.riderPh}</Text>
                        <Text style={styles.name}>
                            <Icon 
                                name="phone-forwarded"
                                size={30}
                                color="green"
                                onPress={handlePhoneCall}
                            />
                        </Text>
                    </View>
                    {/* Buyer PH View Ends...... */}
            </View>
            {/* Bottom Info View ends here...... */}


            {/* Cancel Button View Starts Here.... */}
            <View style={styles.parent}>
                <Button 
                    title="RIDER REACHED"
                    color="green"
                    onPress={handleControlBuyerReached}
                />

                <Icon 
                    name="gps-fixed"
                    size={40}
                    color="blue"
                    onPress={handleReturnToMap}
                />
            </View>
            {/* Cancel Button View Ens Here....... */}


        </ScrollView>
            </React.Fragment>
        );
    }
    else
    if(appState===2)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    else
    if(appState===3)
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.tvContainer}>
                    
                    {/* Title View Starts Here...... */}
                    <View style={styles.tvTitleView}>
                        <Text style={styles.tvTitle}>
                            Enter Security Code
                        </Text>
                    </View>
                    {/* Title View Ends Here........ */}


                    {/* SubTitleView starts here.... */}
                    <View style={styles.tvSubTitleView}>
                        <Text style={styles.tvSubTitle}>
                            Ask Rider To Tell Security Code
                        </Text>
                    </View>
                    {/* subTitleView ends here...... */}


                    {/* Text Field Starts Here....... */}
                    <TextInput value={enteredCodeState} onChangeText={handleEnteredCodeChange} keyboardType="default" style={styles.tvTextField} />
                    {/* Text Field Ends Here........ */}


                    {/* Button View Starts Here........ */}
                    <View style={styles.tvBtnView}>
                        <Button onPress={()=>{setAppState(1);setEnteredCodeState("");setCodeState(null)}} title="Cancel" color="blue"/>
                        <Button onPress={handleCodeValidation} title="Check" color="green"/>
                    </View>
                    {/* Button View Ends Here.......... */}

                </View>
            </React.Fragment>
        );
    }
    //Main GUI ends here..............

    //return starts here......
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here........

}//.........................

const styles=StyleSheet.create({
    container:{
        flex:1
    },

    titleView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        paddingLeft:20,
        paddingRight:20
    },

    box:{
        width:'100%',
        marginTop:10,
        borderWidth:2,
        borderColor:'red',
        padding:10,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },

    title:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'red'
    },


    mapView:{
        width:'100%',
        marginTop:10,
        height:((Dimensions.get('window').height/2)+30)
    },

    map:{
        flex:1
    },

    buyerInfoView:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },


    nameView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },


    nameTitle:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'green'
    },


    name:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'green'
    },


    parent:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10
    },

    tvContainer:{
        flex:1,
        paddingLeft:20,
        paddingRight:20
    },

    tvTitleView:{
        width:'100%',
        flexDirection:'row',
        paddingTop:10,
        justifyContent:'flex-start',
        marginTop:10
    },

    tvTitle:{
        fontFamily:'roboto-regular',
        fontSize:20,
        color:'green'
    },


    tvSubTitleView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start'
    },

    tvSubTitle:{
        fontFamily:'roboto-regular',
        fontSize:12
    },

    tvTextField:{
        width:'100%',
        marginTop:20,
        borderWidth:1,
        padding:5,
        fontSize:15
    },


    tvBtnView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:30
    }


    

    
});

export default TripOneView;