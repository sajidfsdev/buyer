import React,{ useEffect } from 'react';
import { View,Text,StyleSheet,YellowBox } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import * as Types from '../Store/Types/Request';


import SignInNavigator from '../Navigations/SignInNav';
import DrawerNavigator from '../Navigations/Drawer';
import OpenSocket from 'socket.io-client';
import API from '../Constants/API';
import Soc from '../Constants/Socket';


const secondGrid=(props)=>{

    const id_RP=useSelector(state=>state.auth.id);
    const request_RP=useSelector(state=>state.request.request);
    const dispatch=useDispatch();

    YellowBox.ignoreWarnings([
        'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
      ])

    //redux props starts here...
    const appAuth_RP=useSelector(state=>state.auth.appAuth);
    //redux props ends here.....


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