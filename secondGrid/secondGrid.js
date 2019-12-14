import React,{ useEffect } from 'react';
import { View,Text,StyleSheet,YellowBox,Alert } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import * as Types from '../Store/Types/Request';
import * as Actions from '../Store/Actions/Request';


import SignInNavigator from '../Navigations/SignInNav';
import DrawerNavigator from '../Navigations/Drawer';
import OpenSocket from 'socket.io-client';
import API from '../Constants/API';
import Soc from '../Constants/Socket';


const secondGrid=(props)=>{

    const id_RP=useSelector(state=>state.auth.id);
    const token_RP=useSelector(state=>state.auth.token);
    const request_RP=useSelector(state=>state.request.request);
    const dispatch=useDispatch();

    YellowBox.ignoreWarnings([
        'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
      ])

    //redux props starts here...
    const appAuth_RP=useSelector(state=>state.auth.appAuth);
    //redux props ends here.....


    //Use effect starts here............
    useEffect(()=>{

        //Registering Navigator starts here..........
        navigator.geolocation.watchPosition(
            position => {
            console.log("////////////////////////////////////");
            console.log("///////////BUYER'S DETECTED////////");
             console.log(position.coords.latitude);
             console.log(position.coords.longitude);
             //Alert.alert("POSITIONING CHANGE DETECTED");

             
                 //Alert.alert("TRIPONE DETECTED");
                 //handleSendLocToRider(position.coords.latitude,position.coords.longitude);
            dispatch(Actions.sendMyLocBookToRider(position.coords.latitude,position.coords.longitude));
             
            dispatch(Actions.handleSetMyLatLong(
            position.coords.latitude,
            position.coords.longitude
            ));
             
            console.log("/////////////////////////////////////");
            console.log("/////////////////////////////////////");
            }, 
            error => console.log("ERROR SPECIAL"+error),
            { 
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
              distanceFilter:0.2
            }
           );
        //Registering Navigator ends here............
    },[]);
    //use effect ends here..............


    //Handle send locs to rider starts here.......
    const handleSendLocToRider=async (lat,long)=>{

       
        if(request_RP.status!=="TRIPONE")
        {
            return;
        }
        Alert.alert("TRIP ONE DETECTED");
        
        const riderId=request_RP.riderId;

        //config setup......
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };


        //body setup........
        const body=JSON.stringify({
            riderId:riderId,
            lat:parseFloat(lat),
            long:parseFloat(long)
        });


        //try catch starts here.......
        try
        {
            const res=axios.post(API.server+"/buyer/request/sendMyLocToRider",body,config);

            if(res)
            {
                Alert.alert("LOCS SEND TO RIDER SUCCESSFULLY");
            }
            else
            {
                Alert.alert("FAILED SEND LOC","NETWORK ERROR");
            }
        }
        catch(err)
        {
            if(err.response)
            {
                Alert.alert("FAILEDSENDLOC",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("FAILEDSENDLOC",err.message);
            }
        }
        //try catch ends here.........
    }
    //Handle send locs to rider endds here........


    //gui manipulation starts here...
    let MainGUI=null;

    if(appAuth_RP===false)
    {
        MainGUI=SignInNavigator;
    }
    else
    {
        //testing starts....
        // const io=OpenSocket(API(),{query:{
        //     userId:id_RP
        //   }});
        //testing ends .....
        

        //implementing socket requests starts here........
        const io=OpenSocket(API.server,{
            query:{
                userId:id_RP,
                type:"BUYER"
            }
        });


        //NAVIGATION MONITOR STARTS HERE...........
        
        //NAVIGATION MONITOR ENDS HERE.............



        //SETTING LISTENER FOR APPROVED/REJECTED RESPONSE Starts.....
        io.on("APPROVED",(data)=>{
            let req=JSON.parse(JSON.stringify(request_RP));
            req.status="APPROVED";
            dispatch({
                type:Types.UPDATEREQUEST,
                payload:{
                    request:JSON.parse(JSON.stringify(req))
                }
            });
            
            
        });


        io.on("REJECTED",(data)=>{
            let req=JSON.parse(JSON.stringify(request_RP));
            req.status="REJECTED";
            dispatch({
                type:Types.UPDATEREQUEST,
                payload:{
                    request:JSON.parse(JSON.stringify(req))
                }
            });
        });


        io.on("TRIPONE",(data)=>{
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRR");
            console.log(data);
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
            console.log("CHECKING DATA REQUEST STARTS");
            console.log(data.request);
            console.log("CHECKING DATA REQUEST ENDS ");
            dispatch({
                type:Types.REQUESTLOADEDWITHSUCCESS,
                payload:{
                    request:JSON.parse(JSON.stringify(data.request))
                }
            });
        });


        io.on("RECEIVERIDERLOC",(data)=>{
            console.log("LAT SHARED FROM RIDER");
            console.log("&&&&&&&&&&&&&&&&&&&&&&&");
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
            Alert.alert("RIDER LOC RECEIVED");
            console.log(data.lat);
            console.log(data.long);

            dispatch(Actions.handleUpdateRiderLatLong(
                parseFloat(data.lat),
                parseFloat(data.long)
            ));
            
        });


        io.on("TRIPTWO",(data)=>{

            dispatch(Actions.handleUpdateCompleteRequestStatus("TRIPTWO"));
        });


        io.on("TRIPTHREE",(data)=>{
            dispatch(Actions.handleUpdateCompleteRequestStatus("TRIPTHREE"));
        });

        io.on("FINISH",(data)=>{
            dispatch(Actions.handleUpdateCompleteRequestStatus("FINISH"));
        });
        //SETTING LISTENER FOR APPROVED/REJECTED RESPONSE Ends.......



        Soc.setIO(io);
        //implementing socket request ends here...........
        MainGUI=DrawerNavigator;
    }
    
    //gui manipulation ends here.....

    

    //return starts here...
    return (
        <MainGUI />
    );
    //return ends here.....
}//........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default secondGrid;