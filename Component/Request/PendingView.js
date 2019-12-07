import React,{ useState,useEffect } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Alert,ScrollView,Image } from 'react-native';
import Color from '../../Constants/Colors';
import { Table, Row, Rows } from 'react-native-table-component';
import { useSelector,useDispatch } from 'react-redux';
import AppLoading from '../../Reusable/AppLoading'
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import API from '../../Constants/API';
import * as Types from '../../Store/Types/Request';
import * as Action from '../../Store/Actions/Request';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
//receiving props request
let inter=null;



const PendingView=(props)=>{

    if(props.request.status !== "PENDING")
    {
        clearInterval(inter);
    }

    let time=150;
    //state management starts here....
    const [tableHead,setTableHead]=useState(['Item','Price','Qty','Sum']);
    const [timerState,setTimerState]=useState(15);//*********Please also Update This */
    const id_RP=useSelector(state=>state.auth.id);
    const token_RP=useSelector(state=>state.auth.token);
    const dispatch=useDispatch();
    const [appState,setAppState]=useState(1);
    //state management ends here......

    useEffect(()=>{
    //setting Interval starts....
    inter=setInterval(decTimer,1000);
    //setting Interval ends .....
    },[]);


    //Handle search rider starts here.............
    const handleSearchRider=async ()=>{

        setAppState(2);

        const loc=await handleGetMyLocation();

        if(loc===null)
        {
            return
        }
        else
        {

            //config.........
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'b-auth-humtoken':token_RP
                }
            };


            //body setup......
            const body=JSON.stringify({
                id:props.request._id,
                latitude:loc.coords.latitude,
                longitude:loc.coords.longitude,
                vendorLat:props.request.vendorLat,
                vendorLong:props.request.vendorLong,
                outletName:props.request.outletName
             
            });

            console.log("LAST CHECK FROM BUYER");
            console.log("CHECK AND MATCH REQUEST ID");
            console.log(props.request._id);


            //try catch starts here........
            try
            {
                const res=await axios.post(API.server+"/buyer/request/findRider",body,config);

                if(res)
                {
                    let req=JSON.parse(JSON.stringify(props.request));
                    req.status="SEARCHING";
                    setAppState(1);
                    dispatch({type:Types.UPDATEREQUEST,payload:{
                        request:JSON.parse(JSON.stringify(req))
                    }});
                    Alert.alert("RES HAS CAME");
                }
                else
                {
                    setAppState(1);
                    Alert.alert("Network Error");
                }
            }
            catch(err)
            {
                if(err.response)
                {
                    setAppState(1);
                    Alert.alert("Failed",err.response.data.errorMessage);
                }
                else
                {
                    setAppState(1);
                    Alert.alert("Failed",err.message);
                }
            }
            //try catch ends here..........
        }
    }
    //Handle search rider ends here...............




    //Handle Getting My Location starts here......
    const handleGetMyLocation=async ()=>{

        //try catch starts here........
        try
        {
            const perm=await Permissions.askAsync(Permissions.LOCATION);

            if(perm.status==='granted')
            {
                const loc=await Location.getCurrentPositionAsync({enableHighAccuracy:true});

                return loc;
            }
            else
            {
                Alert.alert("Permission Denied","You have to enable geolocation to search Rider");
                return null;
            }
        }
        catch(err)
        {
            Alert.alert(err.message);
            return null;
        }
        //try catch ends here..........
    }
    //Handle Getting My Location Ends Here........






        //Handle Delete Request starts here........
        const handleDeleteRequest=async ()=>{

            setAppState(2);
    
            //config setup.......
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'b-auth-humtoken':token_RP
                }
            };
    
    
            //body setup.....
            const body=JSON.stringify({
                buyerId:id_RP
            });
    
    
            //try catch starts here...........
            try
            {
                const res=await axios.post(API.server+"/buyer/request/remove",body,config);
    
                if(res)
                {
                    setAppState(1);
                    dispatch({type:Types.REMOVEREQUEST});
                }
                else
                {
                    setAppState(1);
                    Alert.alert("Failed","Could Not Remove Request Due To Network Error");
                }
            }
            catch(err)
            {
                setAppState(1);
                if(err.response)
                {
                    Alert.alert("Failed",err.response.data.errorMessage);
                }
                else
                {
                    Alert.alert("Failed",err.message);
                }
            }
            //try catch ends here.............
        }
        //Handle Delete Request Ends Here..........


       //Dec Timer Starts Here....
       const decTimer=()=>{
        console.log("Timer Reduction Called");

        if(time>=2)
        {
            setTimerState(time-1);
            time=time-1;
        }
        else
        {
            console.log("Interval Cleared");
            clearInterval(inter);

            //dispatching clearing call.....
            dispatch({type:Types.STARTBUFFERING});

            dispatch(Action.handleChangeRequestStatus(id_RP,"NOTRESPONDED",token_RP));

        }
    }
    //Dec Timer Ends Here......


  


 



    //Compute starts here....
    const computeTotal=()=>{
        let total=0;
        props.request.products.forEach(prod => {
            total=parseFloat(total=total+(prod.price*prod.qty));
        });
        return total;
    }
    //Compute ends here......


    //Main GUI man starts here......
    let mainGUI=null;

    if(props.request.status==="SEARCHING")
    {
        mainGUI=(<React.Fragment>
           
           <ScrollView style={{flex:1}}>

<View style={styles.scontainer}>

    {/* Top Title starts here... */}
    <View style={styles.stitleView}>
        <Text style={styles.stitle}>Searching Nearby Rider</Text>
    </View>
    {/* Top title ends here..... */}


    {/* Image View Starts Here.... */}
    <View style={styles.simageView}>
        <Image style={styles.simage} 
        // source={require('../../assets/images/waves.gif')} 
        source={{
            uri:'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjAv9fKzqLmAhW1DWMBHWJbDj0QjRx6BAgBEAQ&url=https%3A%2F%2Fsteemit.com%2Finventions%2F%40kid4life%2F5-inventions-that-changed-the-world-nikola-tesla-radio&psig=AOvVaw35uv-1WcsHHZhx6SLbnROX&ust=1575776371810545'
        }}
        />
    </View>
    {/* Image View Ends Here...... */}


</View>

</ScrollView>
        </React.Fragment>);
    }
    else
    if(props.request.status==="PENDING")
    {
        mainGUI=(
            <React.Fragment>
                            <View style={styles.container}>
                
                {/* Title starts Here...... */}
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Waiting For Vendor's Response
                    </Text>
                </View>
                {/* Title ends Here........ */}



                {/* CountDown View Starts Here.... */}
                <View style={styles.countdownView}>
                    <Text style={styles.countdownText}>{timerState+" Seconds"}</Text>
                </View>
                {/* CountDown View Ends Here...... */}



                {/* Bill View Starts Here.... */}
                <View style={styles.billView}>
                    {/* Copied Table Starts Here..... */}
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={
                            //run time man starts here....
                            props.request.products.map((elem,index)=>{
                                return (
                                    [
                                        elem.name,
                                        elem.price,
                                        elem.qty,
                                        parseFloat(elem.price*elem.qty)
                                    ]
                                );
                            })
                            //run time man ends here....
                        } 
                        textStyle={styles.text}
                        />
                    </Table>
                    {/* Copied Table Ends Here....... */}
                </View>
                {/* Bill View Ends Here...... */}




                {/* Grand Total View Starts Here.... */}
                <View style={styles.paddingView}>
                        <View style={styles.gtView}>
                            <Text style={styles.getText}>
                                {
                                    computeTotal()+" Rs"
                                }
                            </Text>
                        </View>
                </View>
                {/* Grand Total View Ends Here...... */}
            </View>
            </React.Fragment>
        );
    }
    else
    if(props.request.status==="APPROVED")
    {
        mainGUI=(
            <React.Fragment>
               
                <View style={styles.iconView}>
                    <Icon
                        name="clipboard-check"
                        size={150}
                        color={Color.success}
                    />
                    <Text style={styles.approvedText}>Vendor Has Approved Request</Text>

                    <TouchableOpacity style={styles.to} onPress={handleSearchRider}>
                        <View style={styles.toViewGreen}>
                            <Text style={styles.toText}>SEARCH RIDER</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.to} onPress={handleDeleteRequest}>
                        <View style={styles.toViewRed}>
                            <Text style={styles.toText}>CANCEL REQUEST</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.paddingView}></View>
                    <View style={styles.paddingView}></View>
                    
                    
                </View>
               
            </React.Fragment>
        );
    }
    else
    if(props.request.status==="REJECTED")
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.rejectedView}>
                    
                        <Icon 
                            name="trash-alt"
                            size={150}
                            color={Color.danger}
                        />

                        <Text style={styles.trashTitle}>
                            Vendor Has Rejected Request
                        </Text>

                        <TouchableOpacity style={styles.to} onPress={handleDeleteRequest}>
                        <View style={styles.toViewRed}>
                            <Text style={styles.toText}>CANCEL REQUEST</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </React.Fragment>
        );
    }
    else
    if(props.request.status==="OFFLINE")
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.rejectedView}>
                    
                        <Icon 
                            name="power-off"
                            size={150}
                            color={Color.danger}
                        />

                        <Text style={styles.trashTitle}>
                            Vendor is OFFLINE
                        </Text>

                        <TouchableOpacity style={styles.to} onPress={handleDeleteRequest}>
                        <View style={styles.toViewRed}>
                            <Text style={styles.toText}>CANCEL REQUEST</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </React.Fragment>
        );
    }   
    else
    if(props.request.status==="CORRUPTED")
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.rejectedView}>
                    
                        <Icon 
                            name="trash-alt"
                            size={150}
                            color={Color.danger}
                        />

                        <Text style={styles.trashTitle}>
                            Some Error Has Occurred. Process Could Not Be Continued
                        </Text>

                        <TouchableOpacity style={styles.to} onPress={handleDeleteRequest}>
                        <View style={styles.toViewRed}>
                            <Text style={styles.toText}>CANCEL REQUEST</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </React.Fragment>
        );
    }
    //Main GUI man ends here........


    if(appState===2)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }

    //return starts here......
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here........

}//.........................

const styles=StyleSheet.create({
    container:{
        flex:1
    },

    head: { height: 40, backgroundColor:Color.welcomeBack },
    text: { margin: 6,color:'black' },


    titleView:{
        width:'100%',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },


    titleText:{
        fontFamily:'roboto-regular',
        color:Color.welcomeBack,
        fontSize:17
    },


    countdownView:{
        width:'100%',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },


    countdownText:{
        fontFamily:'roboto-regular',
        color:Color.success,
        fontSize:30
    },


    billView:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20
    },



    paddingView:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:20

    },


    gtView:{
        width:120,
        padding:5,
        backgroundColor:Color.success,
        flexDirection:'row',
        justifyContent:'center'
    },


    getText:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    },


    iconView:{
        flex:1,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
        
    },


    approvedText:{
        fontSize:19,
        color:Color.success,
        fontFamily:'roboto-regular',
        marginTop:10
    },

    btnView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:30,
        paddingLeft:20,
        paddingRight:20
    },


    to:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20
    },


    toViewGreen:{
        width:'100%',
        backgroundColor:Color.success,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },

    toViewRed:{
        width:'100%',
        backgroundColor:Color.danger,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },

    toText:{
        color:'white',
        fontFamily:'roboto-regular',
        fontSize:15
    },


    rejectedView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },


    trashTitle:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.danger,
        marginTop:20
    },



    scontainer:{
        flex:1
    },


    simageView:{
        width:'100%',
        padding:5,
        marginTop:15
    },


    simage:{
        width:'100%',
        height:350
    },


    stitleView:{
        width:'100%',
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },

    stitle:{
        fontFamily:'roboto-regular',
        fontSize:24,
        color:"green"
    }


    
});

export default PendingView;