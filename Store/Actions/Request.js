import * as Types from '../Types/Request';
import axios from 'axios';
import API from '../../Constants/API';
import React from 'react';
import { Alert } from 'react-native';

//handle fetch my request starts here....
export const fetchMyRequest=(buyerId,token)=>{

    //config steup....
    const config={
        headers:{
            'Content-Type':'application/json',
            'b-auth-humtoken':token
        }
    };



    //body setup starts....
    const body=JSON.stringify({
        buyerId:buyerId
    });

    //return starts here....
    return async dispatch=>{

        //try catch starts here.....
        try
        {
            const res=await axios.post(API.server+"/buyer/request/getMyRequestInfo",body,config);

            if(res)
            {
                console.log("Request Data Has Arrieved");
                console.log("11111111111111111111111111111111111111111111111111111");
                console.log(res.data.data);
                return dispatch({
                    type:Types.REQUESTLOADEDWITHSUCCESS,
                    payload:{
                        request:JSON.parse(JSON.stringify(res.data.data))
                    }
                });
            }
            else
            {
                console.log("No Res");
                console.log("11111111111111111111111111111111111111111111111111111");
                
                return dispatch({
                    type:Types.REQUESTLOADEDWITHERROR,
                    payload:{
                        errorMessage:"Could Not Retrieve Info Due To Network Error"
                    }
                });
            }
        }
        catch(err)
        {
            if(err.response)
            {
                if(err.response.data.errorMessage==="NF")
                {
                console.log("NF");
                console.log("11111111111111111111111111111111111111111111111111111");
                
                return dispatch({
                    type:Types.REQUESTLOADEDWITHERROR,
                    payload:{
                        errorMessage:"You Have Not Issued Any Request Yet"
                    }
                });
                }
                else
                {
                    console.log("Error Message");
                console.log("11111111111111111111111111111111111111111111111111111");
                
                return dispatch({
                    type:Types.REQUESTLOADEDWITHERROR,
                    payload:{
                        errorMessage:err.response.data.errorMessage
                    }
                });

                }
            }
            else
            {
                console.log("ERROR");
                console.log("11111111111111111111111111111111111111111111111111111");
                
                return dispatch({
                    type:Types.REQUESTLOADEDWITHERROR,
                    payload:{
                        errorMessage:err.message
                    }
                });

            }
        }
        //try catch ends here.......
    }
    //return ends here......
}
//Hnalde fetch my Request ends here......







//Handle change request status starts here.....
export const handleChangeRequestStatus=(buyerId,status,token)=>{

    //config setup.....
    const config={
        headers:{
            'Content-Type':'application/json',
            'b-auth-humtoken':token
        }
    };



    //body starts here.....
    const body=JSON.stringify({
        buyerId:buyerId,
        status:status
    });



    //try catch starts here.....
    return async (dispatch,getState)=>{

        let request=JSON.parse(JSON.stringify(getState().request.request));
        request.status=status;
        //try catch starts here....
        try
        {
            const res=await axios.post(API.server+"/buyer/request/setStatus",body,config);

            if(res)
            {
                //Alert.alert("res","Res Has Come successfully");
                return dispatch({
                    type:Types.UPDATEREQUEST,
                    payload:{
                        request:JSON.parse(JSON.stringify(request))
                    }
                });
            }
            else
            {
                request.status="CORRUPTED";
                Alert.alert("Failed","Not Able To Get Response Due To Network Error");
                return dispatch({
                    type:Types.UPDATEREQUEST,
                    payload:{
                        request:JSON.parse(JSON.stringify(request))
                    }
                });

            }
        }
        catch(err)
        {
            request.status="CORRUPTED";
            if(err.response)
            {
                Alert.alert("Failed",err.response.data.errorMessage);
                return dispatch({
                    type:Types.UPDATEREQUEST,
                    payload:{
                        request:JSON.parse(JSON.stringify(request))
                    }
                });
            }
            else
            {
                Alert.alert("Failed",err.message);
                return dispatch({
                    type:Types.UPDATEREQUEST,
                    payload:{
                        request:JSON.parse(JSON.stringify(request))
                    }
                });
            }
        }
        //try catch ends here......
    }
    //try catch ends here........
}
//Handle change request status ends here.......






//Handle set my LAT LONG starts here.........
export const handleSetMyLatLong=(lat,long)=>{

    //return dispatch starts here.....
    return (dispatch,getState)=>{

        //old request....
        const req=JSON.parse(JSON.stringify(getState().request.request));
        req.buyerLat=lat;
        req.buyerLong=long;

        //dispatching to set my own lat long....
        dispatch({
            type:Types.SET_MY_PERSONAL_LAT_LONG,
            payload:{
                lat:parseFloat(lat),
                long:parseFloat(long)
            }
        });

        //dispatching to set New LOC Locally.....
        dispatch({
            type:Types.REQUESTLOADEDWITHSUCCESS,
            payload:{
                request:JSON.parse(JSON.stringify(req))
            }
        });
        //dispatching to set New LOC locally....
    }
    //return dispatch ends here.......

}
//Handle set my Lat Long ends here...........





//Handle Update Rider Lat Long starts here.......
export const handleUpdateRiderLatLong=(lat,long)=>{

    
    //return starts here.......
    return (dispatch,getState)=>{
        let req=JSON.parse(JSON.stringify(getState().request.request));
        req.riderLat=parseFloat(lat);
        req.riderLong=parseFloat(long);

        dispatch({
            type:Types.UPDATEREQUEST,
            payload:{
                request:JSON.parse(JSON.stringify(req))
            }
        });
    }
    //return ends here.........
}
//Handle update Rider Lat Long Ends Here.........







//Hanle set my LOC BOOK to Rider starts here......
export const sendMyLocBookToRider=(lat,long)=>{

    //return starts here.....
    return async (dispatch,getState)=>{
        const status=getState().request.request.status;
        const token=getState().auth.token;
        console.log("REDUX--&%(*(*&()&()*_)*_)*)(&(*^*&%^&$%^#^%");
        console.log(status);
        if(status==="TRIPONE" || status==="TRIPTHREE")
        {
            console.log("TRIP ONE DETECTED SUCCESSFULLY");
            const riderId=getState().request.request.riderId;
            //config setup......
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token
            }
        };


        //body setup........
        const body=JSON.stringify({
            riderId:riderId,
            lat:parseFloat(lat),
            long:parseFloat(long)
        });

        //try catch starts here.........
        try
        {
            const res=await axios.post(API.server+"/buyer/request/sendMyLocToRider",body,config);

            if(res)
            {
                Alert.alert("LOCS SEND TO RIDER SUCCESSFULLY");
                dispatch({type:Types.NOTHING});
            }
            else
            {
                Alert.alert("FAILED SEND LOC","NETWORK ERROR");
                dispatch({type:Types.NOTHING});
            }
        }
        catch(err)
        {

            if(err.response)
            {
                Alert.alert("FAILEDSENDLOCERRRESP",err.response.data.errorMessage);
                dispatch({type:Types.NOTHING});
            }
            else
            {
                Alert.alert("FAILEDSENDLOCERR",err.message);
                dispatch({type:Types.NOTHING});
            }
        }
        //try catch ends here............


        }
    }
    //return ends here.......
}
//Hanle set my Loc BOOK to Rider ends here........






//Handle Update Complete Request Status starts here........
export const handleUpdateCompleteRequestStatus=(status)=>{
    //return starts here.......
    return (dispatch,getState)=>{
        const request=JSON.parse(JSON.stringify(getState().request.request));
        request.status=status;
        dispatch({
            type:Types.UPDATEREQUEST,
            payload:{
                request:JSON.parse(JSON.stringify(request))
            }
        });
    }
    //return ends here.........
}
//Handle Update Complete Request Status ends here..........