import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,Dimensions,TextInput,Button,KeyboardAvoidingView,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconConstant from '../Constants/Icons';
import Colors from '../Constants/Colors';
import AppLoading from '../Reusable/AppLoading';
import axios from 'axios';
import API from '../Constants/API';

import * as ActionTypes from '../Store/Types/Auth';
import { useDispatch } from 'react-redux';

const SignIn=(props)=>{

    const dispatch=useDispatch();

    //state management starts here...
    const [appState,setAppState]=useState(1);
    const [phState,setPhState]=useState('');
    const [passState,setPassState]=useState('');
    const [phValState,setPhValState]=useState(false);
    const [passValState,setPassValState]=useState(false);
    //state management ends here.....

    //Handle signin starts here....
    const handleSignIn=async()=>{
        //setting buffering...
        setAppState(2);

        //body formation
        const body=JSON.stringify({
            ph:phState.toString(),
            pass:passState
        });

        //config starts here...
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };

        //try catch starts here....
        try
        {
            const res=await axios.post(API.server+"/buyer/signin",body,config);

            if(res)
            {
                setAppState(1);
                
                const payload={
                    token:res.data.token,
                    id:res.data.id
                };

                //dispatching
                dispatch({type:ActionTypes.APPAUTHENTICATED,payload:payload});
            }
            else
            {
                Alert.alert("SignIn Failes","SignIn Failed Due To Network Error");
            }
        }
        catch(err)
        {
            setAppState(1);
            if(err.response)
            {
                Alert.alert("SignIn Failed",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("SignIn Failed",err.message);
            }
        }
        //try catch ends here......
        
    }
    //handle signin ends here......


    //custom method starts here...
    const handlePhInput=(ph)=>{
        let str=ph.toString();

        if(str.length===0)
        {
            setPhValState(false);
        }
        else
        {
            setPhValState(true);
        }

        setPhState(str);
    }

    const handlePassInput=(pass)=>{

        if(pass.length===0)
        {
            setPassValState(false);
        }
        else
        {
            setPassValState(true);
        }

        setPassState(pass);
    }
    //custom method ends here.....


    //Submit btn GUI man starts here....
    let submitBtnGUI=null;

    submitBtnGUI=(
        <Button style={styles.btn} color="gray" title="LOGIN" />
    );

    if(
        phValState===true &&
        passValState===true
    )
    {
        submitBtnGUI=(
            <Button onPress={handleSignIn} style={styles.btn} color={Colors.success} title="LOGIN" />
        );
    }
    //submit btn GUI man ends here......

    //main gui starts here...
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(
            <ScrollView style={styles.container}>
            <KeyboardAvoidingView keyboardVerticalOffset={1} behavior="position">
            <View style={styles.subContainer}>
                <View style={{...styles.iconView,backgroundColor:Colors.welcomeBack}}>
                    <Icon name={IconConstant.logo} size={60} color="white" />
                </View>

                <View style={styles.titleView}>
                    <Text style={{...styles.title,color:Colors.welcomeBack}}>HumRabt</Text>
                </View>


                <View style={styles.inputView}>
                    <TextInput onChangeText={handlePhInput} value={phState} keyboardType="number-pad" style={{...styles.input,borderColor:Colors.welcomeBack}} placeholder="Phone Number" />
                </View>

                <View style={styles.inputView}>
                    <TextInput secureTextEntry={true} onChangeText={handlePassInput} value={passState} keyboardType="default" style={{...styles.input,borderColor:Colors.welcomeBack}} placeholder="Password" />
                </View>


                <View style={styles.btnView}>
                    {
                        submitBtnGUI
                    }
                </View>
            </View>
            </KeyboardAvoidingView>
        </ScrollView>
        );
    }
    else if(appState===2)
    {
        mainGUI=<AppLoading />;
    }
    //main gui ends here.....

    //return starts here...
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here.....

}//....................

const styles=StyleSheet.create({
    container:{
        flex:1
    },

    subContainer:{
        width:'100%',
        height:(Dimensions.get('window').height-50),
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },

    iconView:{
        display:'flex',
        width:150,
        height:150,
        borderRadius:75,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },


    titleView:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center'
    },


    title:{
        fontSize:20,
        fontFamily:'roboto-regular'
    },


    inputView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:25
    },


    input:{
        width:'80%',
        borderBottomWidth:2,
        fontSize:20
    },


    btnView:{
        marginTop:50,
        width:'80%',

    },

    btn:{
        width:'80%'
    }

    

    
});

export default SignIn;