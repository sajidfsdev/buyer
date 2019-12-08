import React,{ useEffect } from 'react';
import { View,Text } from 'react-native';

import { useSelector,useDispatch } from 'react-redux';
import * as Actions from '../Store/Actions/Auth';

import WelcomeScreen from '../Screens/Welcome';
import secondGrid from '../secondGrid/secondGrid';

const Grid=(props)=>{

    //Redux props starts here....
    const { appLoaded }=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    //Redux props ends here......



    //use effect starts here....
    useEffect(()=>{
        handleCloseAppLoading();
    },[]);
    //use effect ends here.......


    //custom methods starts here....
    const handleCloseAppLoading=()=>{
        setTimeout(()=>{
           dispatch(Actions.CompleteAppLoading());
        },5000);
    }
    //custom methods ends here......




    //gui man starts here....
    let MainGUI=null;
    if(appLoaded===false)
    {
        MainGUI=WelcomeScreen;
    }
    else
    {
        MainGUI=secondGrid;
    }
    
    //gui man ends here......

    //return starts here....
    return (
        <React.Fragment>
            <MainGUI />
        </React.Fragment>
    );
    //return ends here......

}//..................

export default Grid;