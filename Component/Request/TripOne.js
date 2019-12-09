import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,Dimensions,Button } from 'react-native';
import MapView,{ PROVIDER_GOOGLE,Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useSelector,useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Linking } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import MapKey from '../../Constants/Maps';

const TripOneView=(props)=>{

    //state management starts here.....
    const [mapRef,setMapRef]=useState();
    //state management ends here.......

    //redux state starts here.....
    const latitude_RP=useSelector(state=>state.request.latitude);
    const longitude_RP=useSelector(state=>state.request.longitude);
    const request_RP=useSelector(state=>state.request.request);
    //redux state ends here.......


    //Handle Cancel Ride Starts....
    const handleControlBuyerReached=()=>{

    }
    //Handle Cancel Ride Ends......


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

    //return starts here......
    return (
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

    
});

export default TripOneView;