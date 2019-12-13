import React,{ useEffect } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import AppLoading from '../Reusable/AppLoading';
import * as Actions from '../Store/Actions/Request';
import * as Types from '../Store/Types/Request';

import PendingView from '../Component/Request/PendingView';
import NotRespondedView from '../Component/Request/NotRespondedView';
import { NavigationEvents } from 'react-navigation';

const Request=(props)=>{

    const dispatch=useDispatch();

    //state management starts here.....
    const id_RP=useSelector(state=>state.auth.id);
    const token_RP=useSelector(state=>state.auth.token);
    const request_RP=useSelector(state=>state.request.request);
    const loaded_RP=useSelector(state=>state.request.loaded);
    const isError_RP=useSelector(state=>state.request.isError);
    const errorMessage_RP=useSelector(state=>state.request.errorMessage);
    //state management ends here.......


    //use effect starts here......
    useEffect(()=>{
        //fetchMyRequest();
    },[]);
    //use effect ends here........


    //Method for fetching my request starts here....
    const fetchMyRequest=()=>{

        //dispatching buffering.....
        dispatch({
            type:Types.STARTBUFFERING
        });

        //dispatching action....
        dispatch(Actions.fetchMyRequest(id_RP,token_RP));
    }
    //Method for fetching my request ends here......


    //Main GUI man starts here.....
    let mainGUI=null;
    if(loaded_RP===true)
    {
        if(isError_RP)
        {
            mainGUI=(
                <React.Fragment>
                    <View style={styles.errorView}>
                        <Text style={styles.errorText}>{errorMessage_RP}</Text>
                    </View>
                </React.Fragment>
            );
        }
        else
        {
           
            ///////////////////Printing Conditionally starts here.....
            switch(request_RP.status)
            {
                
                case "PENDING":
                    mainGUI=(<PendingView request={request_RP} />);
                    break;

                    case "APPROVED":
                        mainGUI=(<PendingView request={request_RP} />);
                    break;

                    case "REJECTED":
                    mainGUI=(<PendingView request={request_RP} />);
                    break;

                    case "SEARCHING":
                    mainGUI=(<PendingView request={request_RP} />);
                    break;

                    case "TRIPONE":
                        mainGUI=(<PendingView request={request_RP} />);
                    break;

                    case "RECEIVECASH":
                        mainGUI=(<PendingView request={request_RP}/>);
                        break;

                    case "TRIPTWO":
                        mainGUI=(<PendingView request={request_RP} />);
                        break;

                    case "TRIPTHREE":
                        mainGUI=(
                            <PendingView request={request_RP} />
                        );
                        break;

                    case "SHOWBILL":
                        mainGUI=(
                            <PendingView request={request_RP} />
                        );
                        break;

                case "NOTRESPONDED":
                    mainGUI=(
                        <React.Fragment>
                            <NotRespondedView request={request_RP} reload={fetchMyRequest} />
                        </React.Fragment>
                    );
                    break;

                case "OFFLINE":
                    mainGUI=(
                        mainGUI=(<PendingView request={request_RP} />)
                    );
                    break;


                case "CORRUPTED":
                    mainGUI=(
                        mainGUI=(<PendingView request={request_RP} />)
                    );
                    break;
            }
            //////////////////Printing Conditionally ends here.........
        }
    }
    else
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    //Main GUI ends here...........

    //return starts here....
    return (
        <React.Fragment>
            <NavigationEvents 
                onDidFocus={fetchMyRequest}
            />
            {mainGUI}
        </React.Fragment>
    );
    //return ends here......

}//......................

const styles=StyleSheet.create({
    container:{
        flex:1
    },


    errorView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },


    errorText:{
        fontFamily:'roboto-regular',
        color:'red',
        fontSize:17
    }
});

export default Request;