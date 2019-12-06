import React,{ useEffect,useRef,useState } from 'react';
import { View,Text,StyleSheet,Alert,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFive from 'react-native-vector-icons/FontAwesome5';
import MapView,{PROVIDER_GOOGLE,Marker,Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { useSelector } from 'react-redux';

import MapConst from '../Constants/Maps';
import { getPreciseDistance } from 'geolib';


const CatSearchViewComp=(props)=>{

    //const for device width and height...
    const windowWidth=Dimensions.get("window").width;
    const windowHeight=Dimensions.get("window").height;

    //redux props starts here...
    const cat_RP=useSelector(state=>state.cat.cat);
    const subCat_RP=useSelector(state=>state.cat.subCat);
    const subSubCat_RP=useSelector(state=>state.cat.subSubCat);
    //redux props ends here.....


    //Ref to maps starts here....
    const mapRef=useRef();
    const [mapRefState,setMapRefState]=useState();
    //Ref to maps ends here......
   
   

    //use effect starts here....
    useEffect(()=>{
       
        // console.log("Hi From Riphah Cafe.....");
        // console.log(props.vendors);
        // console.log(props.region);
        // console.log("See above ***************");
    },[]);
    //use effect ends here......

    const goToVendor=(vendorId,outletName)=>{

        let headerText="";

        //constructing headerText starts here...
        if(subCat_RP==="not available")
        {
            headerText=cat_RP;
        }
        else if(subSubCat_RP==="not available")
        {
            headerText=cat_RP+" --> "+subCat_RP;
        }
        else
        {
            headerText=cat_RP+" --> "+subCat_RP+" --> "+subSubCat_RP;
        }
        //constructing headerText ends here.....
        props.navigation.navigate('prodsearchbycat',{vendorId:vendorId,headerText:headerText,outletName:outletName});
    }//........................


    //Rset map starts here....
    const resetMap=()=>{
        mapRefState.animateToRegion(props.region,1000);
    }
    //Reset map ends here.....

    //return starts here...
    return (
        <View style={styles.container}>
            <View style={styles.radar} onPress={resetMap}>
                <Icon onPress={resetMap} style={styles.shot} name="crosshairs" size={40} color="red" />
            </View>
            <View style={styles.mapView}>
                <MapView 
                     //ref={mapRef}
                    ref={(map) => { setMapRefState(map) }}
                    region={props.region}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    style={{flex:1}}
                >
                    {
                        props.vendors.map((elem,index)=>{
                            return (
                                <MapViewDirections
                                key={index} 
                                //apikey="AIzaSyAupazEeKVS6UE1Yg0ZOo3nWdihAuf9jpY"
                                apikey={MapConst.apikey}
                                origin={{latitude:props.region.latitude,longitude:props.region.longitude}}
                                destination={{latitude:parseFloat(elem.Lat),longitude:parseFloat(elem.Long)}}
                                strokeWidth={7}
                                strokeColor="hotpink"
                                />
                            );
                        })
                    }
                    <Marker 
                    title="Home"
                    coordinate={props.region}
                     >
                         <Icon name="male" size={35} color="purple" />
                     </Marker>

                        {
                            props.vendors.map((elem,index)=>{
                                return (
                                    <Marker
                                        key={index}
                                        coordinate={{
                                            latitude:parseFloat(elem.Lat),
                                            longitude:parseFloat(elem.Long),
                                            latitudeDelta:0.009,
                                            longitudeDelta:0.009
                                        }}
                                        onPress={()=>{goToVendor(elem._id,elem.outletName)}}

                                        
                                    >
                                        <IconFive name="store" size={35} color="#05857c" />
                                        <Text style={styles.markerText}>{elem.outletName}</Text>
                                        <Text style={styles.markerText}>
                                            {
                                                parseFloat(getPreciseDistance(
                                                    {latitude:props.region.latitude,longitude:props.region.longitude},
                                                    {latitude:parseFloat(elem.Lat),longitude:parseFloat(elem.Long)}
                                                )/1000).toFixed(2)+" KM"
                                            }
                                        </Text>
                                    </Marker>
                                );
                            })
                        }

                </MapView>
            </View>
        </View>
    );
    //return ends here.....

}//...........................

const styles=StyleSheet.create({
    container:{
        flex:1
    },

    mapView:{
        flex:1,
        width:'100%',
        height:'100%'
    },

    markerText:{
        fontFamily:'roboto-regular',
        fontWeight:'bold',
        color:"#05857c"
    },

    radar:{
        width:'100%',
        position:'absolute',
        zIndex:100,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:(Dimensions.get("screen").height/4)*3
    },


    shot:{
        marginRight:10,
        color:"blue"
    }
});

export default CatSearchViewComp;