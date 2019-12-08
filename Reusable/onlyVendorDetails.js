import React,{ useEffect,useState } from 'react';
import { View,Text,StyleSheet,Dimensions,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFive from 'react-native-vector-icons/FontAwesome5';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { useSelector } from 'react-redux';

import MapConst from '../Constants/Maps';
import { getPreciseDistance } from 'geolib';




const CatSearchViewComp=(props)=>{


    //Ref to maps starts here....
   
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


    


    //Rset map starts here....
    const resetMap=()=>{
        mapRefState.animateToRegion(props.navigation.getParam("region"),1000);
    }
    //Reset map ends here.....

    //return starts here...
    return (


        //Copied area starts here......
        <View style={styles.container}>
        <View style={styles.radar} onPress={resetMap}>
            <Icon onPress={resetMap} style={styles.shot} name="crosshairs" size={40} color="red" />
        </View>
        <View style={styles.mapView}>

            
            <MapView 
                 //ref={mapRef}
                ref={(map) => { setMapRefState(map) }}
                region={props.navigation.getParam("region")}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                style={styles.secondMapView}
            >
                
                    
                            <MapViewDirections
                          
                            //apikey="AIzaSyAupazEeKVS6UE1Yg0ZOo3nWdihAuf9jpY"
                            apikey={MapConst.apikey}
                            origin={{
                                latitude:props.navigation.getParam("region").latitude,
                                longitude:props.navigation.getParam("region").longitude
                            }}
                            destination={{
                                latitude:parseFloat(props.navigation.getParam("vendor").Lat),
                                longitude:parseFloat(props.navigation.getParam("vendor").Long)
                            }}
                            strokeWidth={7}
                            strokeColor="hotpink"
                            />
                    
                
                <Marker 
                title="Home"
                coordinate={props.navigation.getParam("region")}
                 >
                     <Icon name="male" size={35} color="purple" />
                 </Marker>

                   
                                <Marker
                                   
                                    coordinate={{
                                        latitude:parseFloat(props.navigation.getParam("vendor").Lat),
                                        longitude:parseFloat(props.navigation.getParam("vendor").Long),
                                        latitudeDelta:0.009,
                                        longitudeDelta:0.009
                                    }}
                                    

                                    
                                >
                                    <IconFive name="store" size={35} color="#05857c" />
                                    <Text style={styles.markerText}>{props.navigation.getParam("vendor").outletName}</Text>
                                    <Text style={styles.markerText}>
                                        {
                                            parseFloat(getPreciseDistance(
                                                {latitude:props.navigation.getParam("region").latitude,longitude:props.navigation.getParam("region").longitude},
                                                {latitude:parseFloat(props.navigation.getParam("vendor").Lat),longitude:parseFloat(props.navigation.getParam("vendor").Long)}
                                            )/1000).toFixed(2)+" KM"
                                        }
                                    </Text>
                                </Marker>
                            

            </MapView>


          {/* scroll view starts here...... */}
          <ScrollView style={styles.ScrollView}>
                <View style={styles.shopNameView}>
                    <Text style={styles.shopName}>
                        {
                            props.navigation.getParam("vendor").outletName
                        }
                    </Text>
                </View>


                <View style={styles.addressView}>
                    <Text style={styles.address}>
                        {
                            "Shop Number: "+props.navigation.getParam("vendor").outletNumber
                        }
                    </Text>

                    <Text style={styles.address}>
                        {
                            "Street No: "+props.navigation.getParam("vendor").outletStreet
                        }
                    </Text>


                    <Text style={styles.address}>
                        {
                            "Region: "+props.navigation.getParam("vendor").outletRegion
                        }
                    </Text>


                    <Text style={styles.address}>
                        {
                            "City "+props.navigation.getParam("vendor").outletCity
                        }
                    </Text>
                </View>
          </ScrollView>
          {/* scroll view ends here........ */}
            
        </View>
    </View>
        //copied area ends here........
        
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
        height:370
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
    },


    secondMapView:{
        width:'100%',
        height:370
    },


    ScrollView:{
        width:'100%',
        padding:5

    },


    shopNameView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        padding:2
    },

    shopName:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:"green",
        fontWeight:'bold'
    },


    addressView:{
        width:'100%',
        padding:5,
        flexDirection:'column',
        
    },


    address:{
        fontFamily:'roboto-regular',
        fontSize:15,
        marginTop:3
    }
});

export default CatSearchViewComp;