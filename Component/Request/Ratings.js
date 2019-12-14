import React,{ useState } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import API from '../../Constants/API';
import * as Types from '../../Store/Types/Request';
import AppLoading from '../../Reusable/AppLoading';
import { useSelector,useDispatch } from 'react-redux';


//changing import starts...
import Color from '../../Constants/Colors';


const Testing=(props)=>{

    //ratigs state management starts here....
    const [ratings,setRatings]=useState(3);
    const [bufferringState,setBifferringState]=useState(false);
    //ratings state management ends here......

    //redux state starts here....
    const dispatch=useDispatch();
    const token_RP=useSelector(state=>state.auth.token);
    const request_RP=useSelector(state=>state.request.request);
    ///redux state ends here.....


    //Handle Go Bact Starts here.....
    const handleGoBack=async ()=>{

        setBifferringState(true);

        //config....
        const config={headers:{'Content-Type':'application/json','b-auth-humtoken':token_RP}};

        //setting body...
        const body=JSON.stringify({requestId:request_RP._id,rating:ratings});

        //try catch starts here.....
        try
        {
            const res=await axios.post(API.server+"/buyer/request/rate",body,config);

            if(res)
            {
                //setBifferringState(false);

                dispatch({type:Types.REQUESTLOADEDWITHERROR,payload:{
                    errorMessage:"There Is No Pending Request"
                }});
            }
            else
            {
                setBifferringState(false);
                Alert.alert("Failed","NETWORK ERROR");
            }
        }
        catch(err)
        {
            setBifferringState(false);
            if(err.response)
            {
                Alert.alert("Failed",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("Failed",err.message);
            }
        }
        //try catch ends here.......
    }
    //Handle Go Back ends here.......



    const ratingCompleted=(rat)=>{
        setRatings(rat);
      }


      //detecting the bufferring state starts here.....
      if(bufferringState===true)
      {
          return (
              <AppLoading/>
          );
      }
      //detecting the bufferring state ends here.......

    

    //return starts here....
    return (
        <React.Fragment>
            <View style={styles.container}>
                
                <View style={styles.titleView}>
                    <Text style={styles.title}>PRODUCT DELIVERED</Text>
                </View>

                <View>
                    <Icon 
                        name="wallet-giftcard"
                        size={120}
                        color="purple"
                    />
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>RATE RIDER</Text>
                </View>
            
                    <Rating
                    showRating
                    onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 10 }}
                    />


                    {/* Go Back Button Starts Here..... */}
                    <TouchableOpacity onPress={handleGoBack} style={styles.to} activeOpacity={0.5}>
                        <Text style={styles.toText}>
                            GO BACK
                        </Text>
                    </TouchableOpacity>
                    {/* Go Back Button Ends Here....... */}
            </View>
        </React.Fragment>
    );
    //return ends here......

}//........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20
    },

    to:{
        width:'100%',
        padding:15,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.success
    },

    toText:{
        fontFamily:'roboto-regular',
        fontSize:12,
        color:'white'
    },

    titleView:{
        width:'100%',
        padding:20,
        justifyContent:'center',
        alignItems:'center'
    },

    title:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.success,
        fontWeight:'bold'
    }
});

export default Testing;