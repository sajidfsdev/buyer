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