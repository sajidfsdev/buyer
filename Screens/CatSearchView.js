import React,{ useEffect,useState } from 'react';
import { Text,View,StyleSheet,Alert } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import axios from 'axios';
import API from '../Constants/API';
import { useSelector } from 'react-redux';
import AppLoading from '../Reusable/AppLoading';
import CatSearchViewComp from '../Component/catsearchview';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../Reusable/HeaderBtn';

const CatSearchView=(props)=>{

    //state management starts here...
    const [appState,setAppState]=useState(1);//1loading....2loadedWithSuccess.....3loadedWithError
    const [errorState,setErrorState]=useState("Some Error Message");
    const [vendorList,setVendorList]=useState([]);
    const [latState,setLatState]=useState({
        latitude:null,
        longitude:null,
        latitudeDelta:null,
        longitudeDelta:null
    });
    //state management ends here.....

    //redux props starts here...
    const cat_RP=useSelector(state=>state.cat.cat);
    const subCat_RP=useSelector(state=>state.cat.subCat);
    const subSubCat_RP=useSelector(state=>state.cat.subSubCat);
    const token_RP=useSelector(state=>state.auth.token);
    //redux props ends here.....



    //use effect starts here......
    useEffect(()=>{

        startFetching();


        //Registering for the location tracking starts here...
        // navigator.geolocation.getCurrentPosition(
        //     position => {
        //       Alert.alert("POsition Change","POSITION Change Detected");
        //     //   this.setState({
        //     //    latitude: position.coords.latitude,
        //     //    longitude: position.coords.longitude,
        //     //   error: null
        //     //  });
        //     setLatState({
        //         latitude:position.coords.latitude,
        //         longitude:position.coords.longitude,
        //         latitudeDelta:0.009,
        //         longitudeDelta:0.009
        //     });
        //    },
        //    error => Alert.alert("GPS Error",err.message),
        //     { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
        //     );
        //Registering for the location tracking ends here......

    },[]);
    //use effect ends here........


    //Getting Location starts here....
    const getGPSLocation=async ()=>{

        const permission=await Permissions.askAsync(Permissions.LOCATION);

        if(permission.status==='granted')
        {
            const loc=await Location.getCurrentPositionAsync({enableHighAccuracy:true});

            if(loc)
            {
                setLatState({
                    latitude:loc.coords.latitude,
                    longitude:loc.coords.longitude,
                    latitudeDelta:0.085,//0.45
                    longitudeDelta:0.085//0.45
                });
                setAppState(2);
            }
            else
            {
                setAppState(3);
                setErrorState("Unable To Retrieve Your GPS Location");
            }
        }
        else
        {
            setAppState(3);
            setErrorState("App Needs To Access Your Location. Please Allow Access");
        }
    }
    //Getting Location Ends Here......



    //Method for fetching all Vendors Info starts here....
    const startFetching=async ()=>{

        //config...
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };


        //body ....
        const body=JSON.stringify({
            cat:cat_RP,
            subCat:subCat_RP,
            subSubCat:subSubCat_RP
        });

        //try catch starts here....
        try
        {
            const res=await axios.post(API.server+"/buyer/search/catSearch",body,config);

            if(res)
            {
                setVendorList([...res.data.vendors]);

                //Getting Location Permissions starts here.....
                getGPSLocation();
                //Getting Location Permissions ends here........
                
            }
            else
            {
                setAppState(3);
                setErrorState("Could Not Retrieve Data Duse To Network Error");
            }
        }
        catch(err)
        {
            if(err.response)
            {
                setAppState(3);
                setErrorState(err.response.data.errorMessage);
            }
            else
            {
                setAppState(3);
                setErrorState(err.message);
            }
            
        }
        //try catch ends here......
    }
    //Method for fething all vendors Info ends here........



    //main GUI manipulation starts here.....
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(<AppLoading/>);
    }
    else if(appState===2)
    {
        mainGUI=(<CatSearchViewComp {...props} vendors={vendorList} region={latState} />);
    }
    else
    {
        mainGUI=(
            <View style={styles.container}>
                <Text style={styles.errorText}>{errorState}</Text>
            </View>
        );
    }
    //main gui manipulation ends here.......

    //return starts here...
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here.....

}//............................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },


    errorText:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:"red"
    }
});;


CatSearchView.navigationOptions=(navigationData)=>{
    return {
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

export default CatSearchView;