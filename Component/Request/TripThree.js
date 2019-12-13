import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,Dimensions,TouchableOpacity, Button, Alert } from 'react-native';
import MapView,{ PROVIDER_GOOGLE,Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useSelector,useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Linking } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import MapKey from '../../Constants/Maps';
import AppLoading from '../../Reusable/AppLoading';
import Color from '../../Constants/Colors';
import OrderDetailsView from '../../Reusable/OrderDetails';
import axios from 'axios';
import API from '../../Constants/API';
import * as Actions from '../../Store/Actions/Request';

const TripThreeView=(props)=>{

    const dispatch=useDispatch();

    //state management starts here.....
    const [mapRef,setMapRef]=useState();
    const [detailsState,setDetailsState]=useState(false);
    const [appState,setAppState]=useState(1);//1 default 2 loading
    //state management ends here.......

    //redux state starts here.....
    const latitude_RP=useSelector(state=>state.request.latitude);
    const longitude_RP=useSelector(state=>state.request.longitude);
    const request_RP=useSelector(state=>state.request.request);
    const token_RP=useSelector(state=>state.auth.token);
    //redux state ends here.......


    //Handle products received starts here.....
    const handleProductsReceived=async ()=>{

        setAppState(2);

        //config setup...
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };

        //body starts here.....
        const body=JSON.stringify({
            requestId:request_RP._id
        });

        //try catch starts here.....
        try
        {
            const res=await axios.post(API.server+"/buyer/request/productsReceived",body,config);

            if(res)
            {
                setAppState(1);
                console.log("------------------");
                console.log(res.data.data);
                console.log("-------------------");

                dispatch(Actions.handleShowBillScreen(
                    JSON.parse(JSON.stringify(res.data.data))
                ));
                

            }
            else
            {
                setAppState(1);
            }
        }
        catch(err)
        {
            setAppState(1);
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

    }
    //Handle products received ends here.......


    //Handle Cancel Ride Starts....
    const showOrderDetails=()=>{
        setDetailsState(true);
    }
    //Handle Cancel Ride Ends......


    //Handle Go Back starts here.....
    const handleGoBack=()=>{
        setDetailsState(false);
    }
    //Handle Go Back ends here.......


    //Handle Phone Call starts here......
    const handlePhoneCall=()=>{
        const str="tel:"+request_RP.riderPh;
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

    if(latitude_RP==null || longitude_RP==null)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
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
    else if(detailsState===false)
    {
        mainGUI=(
            <React.Fragment>
                        <ScrollView style={styles.container}>
            
            {/* Title View Starts Here..... */}
            <View style={styles.titleView}>
                <View style={styles.box}>
                    <Text style={styles.title}>Rider Comming Back</Text>
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
                        title="RIDER"
                        coordinate={{
                            latitude:parseFloat(request_RP.riderLat),
                            longitude:parseFloat(request_RP.riderLong)
                        }}
                    >
                        <Icon name="directions-bike" size={40} color="#120d6e" />
                    </Marker>

                    <Marker
                        title="ME"
                        coordinate={{
                            latitude:parseFloat(latitude_RP),
                            longitude:parseFloat(longitude_RP)
                        }}
                    >
                        <Icon name="person-pin-circle" size={40} color="green" />
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
                <Button title="DETAILS" onPress={showOrderDetails} color={Color.success} />

                <Icon 
                    name="gps-fixed"
                    size={40}
                    color="blue"
                    onPress={handleReturnToMap}
                />
            </View>
            {/* Cancel Button View Ens Here....... */}


            {/* Product Received Details Button starts Here....... */}
            <TouchableOpacity onPress={handleProductsReceived} style={styles.prTo} activeOpacity={0.5}>
                <Text style={styles.pr}>PRODUCTS RECEIVED</Text>
            </TouchableOpacity>
            {/* Product Received Details Button Ends Here......... */}


        </ScrollView>
            </React.Fragment>
        );
    }
    else
    {
        mainGUI=(
            <React.Fragment>
                {/* Showing Orders Details Starts Here.......... */}
                <OrderDetailsView request={request_RP} back={handleGoBack} />
                {/* Showing Order Details Ends Here............. */}
            </React.Fragment>
        );
    }
    //MAIN GUI man ends here........

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


    secParent:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        marginBottom:5
    },


    secTitle:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'red',
        fontWeight:'bold'
    },


    sec:{
        fontFamily:'roboto-regular',
        fontSize:15,
        fontWeight:'bold',
        color:'red'
    },


    prTo:{
        width:'100%',
        marginTop:10,
        padding:20,
        marginBottom:20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.success
    },

    pr:{
        fontFamily:'roboto-regular',
        fontSize:12,
        color:'white'
    }

    
});

export default TripThreeView;