import React,{ useState,useRef,useEffect } from 'react';
import { View,Text,StyleSheet,TextInput,ScrollView,KeyboardAvoidingView,Button,Alert } from 'react-native';
import AppLoading from '../Reusable/AppLoading';
import API from '../Constants/API';
import axios from 'axios';
import SuccessSignUp from '../Component/SignUpSuccess';

//testing area starts here....
// import Constants from "expo-constants";

// const { manifest } = Constants;

// const api = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
//testing area ends here......

const SignUp=(props)=>{
    //
    //
    //App state managements starts here
    const [appState,setAppState]=useState(1);
    //1 initial state
    //2 Buffering
    //3 success
    //4 danger
    //
    //
    //state management starts here...
    const [nameState,setNameState]=useState('');
    const [phState,setPhState]=useState('');
    const [passState,setPassState]=useState('');
    const [confirmPassState,setConfirmPassState]=useState('');
    //
    //Validation State
    //
    const [nameValState,setNameValState]=useState(false);
    const [phValState,setPhValState]=useState(false);
    const [passValState,setPassValState]=useState(false);
    const [confirmPassValState,setConfirmPassValState]=useState(false);
    //
    //
    //border color state 
    //
    //
    //
    const [nameBorderColor,setNameBorderColor]=useState('#52a4c4');
    const [phBorderColor,setPhBorderColor]=useState('#52a4c4');
    const [passBorderColor,setPassBorderColor]=useState('#52a4c4');
    const [confirmPassBorderColor,setConfirmPassBorderColor]=useState('#52a4c4');
    //state management ends here.....



    //Ref management starts here...
    const nameRef=useRef();
    const phRef=useRef();
    const passRef=useRef();
    const confirmPassRef=useRef();
    //Ref management ends here.....



    //use effect testing starts here....
    useEffect(()=>{
       // console.log(props.navigation);
    },[]);
    //use effect testing ends here......


    //Custom method starts here....
    handleRegistration=async ()=>{

        setAppState(2);//setting to buffering


        //config starts here....
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        //config ends here......


        //body starts here...
        const body=JSON.stringify({
            name:nameState,
            ph:phState.toString(),
            pass:passState
        });
        //body ends here.....
        

        //try catch starts here...
        try
        {
            const res=await axios.post(API.server+"/buyer/signup",body,config);

            if(res)
            {
                setAppState(3);
                
            }
            else
            {
                setAppState(1);
                Alert.alert("SignUp Failed","Signup failed due to network error");
            }
        }
        catch(err)
        {
            setAppState(1);
            if(err.response)
            {
                Alert.alert("SignUp Failed",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("SignUp Failed",err.message);
            }
            
        }
        //try catch ends here.....

    }
    //Custom method ends here......





    //Input Fillers starts here......(Controlled Input Methods)
    const handleNameInput=(name)=>{
        //validation checking starts here....
        if(name.length===0)
        {
             setNameValState(false);
             setNameState(name);
             setNameBorderColor('red');
        }
        else
        ///^[a-zA-Z ]*$/
        ///^[A-Za-z]+$/
        if(name.match(/^[a-zA-Z ]*$/))
        {
            //console.log("Letter detected");
            setNameValState(true);
            setNameState(name);
            setNameBorderColor('#52a4c4');
        }
        else
        {
            //console.log("Not A Letter");
        }

        
        //validation checking ends here......
        
    }


    const handlePhInput=(ph)=>{
        let str=ph.toString();
        if(isNaN(ph))
        {
            console.log("Not number detected");
            return
        }
        else if(str.length===1 && str[0]!=='0')
        {
            return
        }
        else if(str.length===2 && (str[0]!=='0' || str[1]!=='3'))
        {
            return
        }
        else if(str.length>11)
        {
            return
        }
        else if(str.indexOf(" ")>=0)
        {
            console.log("Space detected");
            return
        }
        else if(str.indexOf('.')>=0)
        {
            console.log("Point detected");
            return
        }
        else if(str.match(/^(?=\d{11}$)(03)\d+/))
        {
            setPhState(ph);
            setPhValState(true);
            setPhBorderColor('#52a4c4');
            console.log("Pattern validated successfully");
        }
        else
        {
            setPhState(ph);
            setPhValState(false);
            setPhBorderColor('red');
            console.log("Pattern could not be validated");
        }
    }//handle ph input ends here....


    const handlePassInput=(pass)=>{
        if(pass.length===0)
        {
            setPassValState(false);
            setPassState(pass);
            setPassBorderColor('red');
            console.log("length is 0");
            return
        }
        else if(pass.length<8)
        {
            setPassValState(false);
            setPassState(pass);
            setPassBorderColor('red');
        }
        
        else
        {
            setPassState(pass);
            setPassValState(true);
            setPassBorderColor('#52a4c4');
        }
    }


    const handleConfirmPassInput=(confirmPass)=>{
        if(confirmPass.length===0)
        {
            setConfirmPassState(confirmPass);
            setConfirmPassValState(false);
            setConfirmPassBorderColor('red');
            return
        }
        else if(passState===confirmPass)
        {
            setConfirmPassValState(true);
            setConfirmPassState(confirmPass);
            setConfirmPassBorderColor('#52a4c4');
            return
        }
        else
        {
            setConfirmPassValState(false);
            setConfirmPassState(confirmPass);
            setConfirmPassBorderColor('red');
        }
    }
    //Input fillers ends here........


    //managing submit btn manipulations starts here....
    let SubmitBtn=<Button  title="REGISTER" color="gray" />

    if(
        nameValState===true &&
        phValState===true &&
        passValState===true &&
        confirmPassValState===true
    )
    {
        SubmitBtn=<Button title="SUBMIT" onPress={handleRegistration} color="#5cb85c" />;
    }
    //managing submit btn manipulation ends here.......


    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(<ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
            <View style={styles.topRow}>
                <Text style={styles.topText}>HumRabt</Text>
            </View>
    
            <View style={styles.title}>
                <Text style={styles.titleText}>Create Your Account!</Text>
            </View>
    
            <View style={styles.inputView}>
                <Text style={styles.label}>Your Name</Text>
                <TextInput value={nameState} onChangeText={handleNameInput} style={{...styles.input,borderColor:nameBorderColor}} placeholder="Your Name" keyboardType="default" />
            </View>
    
            <View style={styles.inputView}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput ref={phRef} value={phState} onChangeText={handlePhInput} style={{...styles.input,borderColor:phBorderColor}} placeholder="Mobile Number" keyboardType="numeric" />
            </View>
    
    
            <View style={styles.inputView}>
                <Text style={styles.label}>Set Password (min 8 chars)</Text>
                <TextInput ref={passRef} value={passState} onChangeText={handlePassInput} style={{...styles.input,borderColor:passBorderColor}} placeholder="Password" keyboardType="default" />
            </View>
    
            <View style={styles.inputView}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput ref={confirmPassRef} value={confirmPassState} onChangeText={handleConfirmPassInput} style={{...styles.input,borderColor:confirmPassBorderColor}} placeholder="Confirm Password" keyboardType="default" />
            </View>
    
            <View style={styles.submitView}>
                <View style={styles.submit}>
                    {/* <Button title="SUBMIT" color="#5cb85c" /> */}
                    {SubmitBtn}
                </View>
            </View>
            </KeyboardAvoidingView>
        </ScrollView>);
    }
    else if(appState===2)
    {
        mainGUI=(
            <AppLoading />
        );
    }
    else if(appState===3)
    {
        mainGUI=(
            <SuccessSignUp {...props} />
        );
    }
    




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

    topRow:{
        width:'100%',
        flexDirection:'row',
        marginTop:20,
        padding:10,
        justifyContent:'flex-start',
        backgroundColor:'#4dade0'
    },

    topText:{
        color:'white',
        fontSize:15,
        fontFamily:'roboto-regular'
    },


    title:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center'
    },

    titleText:{
        color:'black',
        fontSize:24,
        fontFamily:'opensans-regular'
    },

    inputView:{
        marginTop:20,
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },

    input:{
        borderBottomWidth:2,
        width:'80%',
        padding:10,
        fontSize:15
    },

    label:{
        fontSize:15,
        fontFamily:'opensans-thin',
        width:'80%'
    },

    submitView:{
        marginTop:30,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    },


    submit:{
        width:'80%'
    }
});

export default SignUp;