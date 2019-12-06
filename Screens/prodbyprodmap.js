import React,{ useState,useEffect } from 'react';
import { View,Text,StyleSheet,Alert,Dimensions } from 'react-native';
import MapView,{ Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import AppLoading from '../Reusable/AppLoading';
import MapViewDirections from 'react-native-maps-directions';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../Constants/Colors';
import { useSelector } from "react-redux";
import axios from 'axios';
import API from '../Constants/API';
import apikey from '../Constants/Maps';
import { getPreciseDistance } from 'geolib';


import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../Reusable/HeaderBtn';

const prodbyprodmap=(props)=>{

    //redux state starts here...
    const cat_RP=useSelector(state=>state.cat.cat);
    const subCat_RP=useSelector(state=>state.cat.subCat);
    const subSubCat_RP=useSelector(state=>state.cat.subSubCat);
    const token_RP=useSelector(state=>state.auth.token);
    //reduxx state ends here....

    //state management starts here....
    const [appState,setAppState]=useState(1);//1 loading 2 success 3 error
    const [errorState,setErrorState]=useState('');
    const [regionState,setRegionState]=useState({
        latitude:12.23,
        longitude:12.34,
        latitudeDelta:0.045,
        longitudeDelta:0.045
    });
    const [mapRefState,setMapRefState]=useState(null);
    const [vendorState,setVendorState]=useState([]);

    //state management ends here......

    //use effect starts here....
    useEffect(()=>{

        //getting the coords
        fetchVendorData();

    },[]);
    //use effect ends here......


    //Move to product details starts here....
    const moveToProductDetails=(elem)=>{
        props.navigation.navigate("productdetail",{product:elem,outletName:elem.vendorId.outletName});
    }
    //Move to product details ends here......


    //Fetch Vendor's data starts here......
    const fetchVendorData=async ()=>{

        //body formation...
        const body=JSON.stringify({
            cat:cat_RP,
            subCat:subCat_RP,
            subSubCat:subSubCat_RP,
            name:props.navigation.getParam('name')
        });


        //config setting...
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };
        
        //try catch starts here....
        try
        {
           const res=await axios.post(API.server+"/buyer/search/searchProdVendors",body,config);
           
           if(res)
           {
               setVendorState([...res.data.data]);
               getMyCoords();

           }
           else
           {
               setErrorState("Could Not Fetch Vendors Info");
               setAppState(3);
           }
        }
        catch(err)
        {
            if(err.response)
            {
                setErrorState(err.response.data.errorMessage);
                setAppState(3);
            }
            else
            {
                setErrorState(err.message);
                setAppState(3);
            }
        }
        //try catch ends here......
    }
    //fetch Vendor's data ends here........


    //Reset map starts here.....
    const resetMap=()=>{
        mapRefState.animateToRegion(regionState,1000);
    }
    //Reset map ends here.......


    //Method for getting Coords.......
    const getMyCoords=async ()=>{

        //try catch starts here.....
        try
        {
            const param=await Permissions.askAsync(Permissions.LOCATION);

            if(param.status==='granted')
            {
                const loc=await Location.getCurrentPositionAsync({enableHighAccuracy:true});

                if(loc)
                {

                    
                    //Method for fetching the data......
                    
                    setRegionState({
                        latitude:loc.coords.latitude,
                        longitude:loc.coords.longitude,
                        latitudeDelta:0.045,
                        longitudeDelta:0.045
                    });
                    setAppState(2);
                    
                }
                else
                {
                    setAppState(3);
                    setErrorState("Cannot Get Current Location");
                }
            }
            else
            {
                Alert.alert("Permission Denied","For Using This App You Need To Grant GPS Permission");
            }
        }
        catch(err)
        {
            setAppState(3);
            setErrorState(err.message);
        }
        //try catch ends here.......
    }
    //Method for getting coords.......


    //mainGUI man starts here....
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(<AppLoading />);
    }
    else if(appState===2)
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.radar} onPress={resetMap}>
                    <Icon onPress={resetMap} style={styles.shot} name="crosshairs" size={40} color={Color.success} />
                </View>
                <MapView
                    style={{flex:1}} 
                    region={regionState}
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    ref={(ref)=>{setMapRefState(ref)}}
                >

                    {/* Iterating all the Map Directions starts here... */}
                    {
                        vendorState.map((elem,index)=>{
                            return (
                                
                                    <MapViewDirections
                                        key={index}
                                        origin={{
                                            latitude:regionState.latitude,
                                            longitude:regionState.longitude
                                        }}
                                        destination={{
                                            latitude:parseFloat(elem.vendorId.Lat),
                                            longitude:parseFloat(elem.vendorId.Long)
                                        }}
                                        strokeWidth={7}
                                        strokeColor="hotpink"
                                        apikey={apikey.apikey}
                                    />
                                
                            );
                        })
                    }
                    {/* Iterating all the Map directions ends here,,,,, */}
                    <Marker coordinate={{latitude:regionState.latitude,longitude:regionState.longitude}}>
                        <Icon name="male" size={35} color="purple" />
                    </Marker>

                    {/* Iteratig  All Shops Markers starts here */}
                    {
                        vendorState.map((elem,index)=>{
                            return (
                                
                                    <Marker
                                        onPress={()=>{moveToProductDetails(elem)}}
                                        key={index}
                                        coordinate={{
                                            latitude:parseFloat(elem.vendorId.Lat),
                                            longitude:parseFloat(elem.vendorId.Long),
                                            latitudeDelta:0.009,
                                            longitudeDelta:0.009
                                        }}
                                    >
                                 
                                    <Icon name="store" size={35} color="#05857c" />
                                    <Text style={styles.markerText}>{elem.vendorId.outletName}</Text>
                                    <Text style={styles.markerText}>{"Rs:"+elem.price}</Text>
                                        <Text style={styles.markerText}>
                                            {
                                                parseFloat(getPreciseDistance(
                                                    {latitude:regionState.latitude,longitude:regionState.longitude},
                                                    {latitude:parseFloat(elem.vendorId.Lat),longitude:parseFloat(elem.vendorId.Long)}
                                                )/1000).toFixed(2)+" KM"
                                            }
                                        </Text>
                                    
                                    
                                    </Marker>
                                
                            );
                        })
                    }
                    {/* Iterating All Shop markers ends here */}




                </MapView>
            </React.Fragment>
        );
    }
    else
    {
        mainGUI=(
            <View style={styles.errorView}>
                <Text style={styles.error}>{errorState}</Text>
            </View>
        );
    }
    //mainGUI man ends here......

    //return starts here.....
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here.......

}//............................

const styles=StyleSheet.create({
    container:{
        flex:1
    },

    errorView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },


    error:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'red'
    },


    radar:{
        width:'100%',
        position:'absolute',
        zIndex:100,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:(Dimensions.get("screen").height/4)*3
    },


    markerText:{
        fontFamily:'roboto-regular',
        fontWeight:'bold',
        color:"#05857c"
    }
});



prodbyprodmap.navigationOptions=(navigationData)=>{
    const name=navigationData.navigation.getParam("name");
    return {
        headerTitle:name,
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderBtn} >
                <Item 
                    title="home" iconName="home" onPress={()=>{
                        navigationData.navigation.navigate("cat");
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default prodbyprodmap;