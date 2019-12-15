import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { useSelector } from 'react-redux';
import API from '../../Constants/API';
import axios from 'axios';
import AppLoading from '../../Reusable/AppLoading';
import Color from '../../Constants/Colors';

const MainHistoryScreen=(props)=>{

    //state management starts here.....
    const [appState,setAppState]=useState(1);//1 default 2 bufferring 3 error
    const [errorState,setErrorState]=useState('');
    const [historyState,setHistoryState]=useState([]);
    const id_RP=useSelector(state=>state.auth.id);
    const token_RP=useSelector(state=>state.auth.token);
    //state management ends here........


    //Handle show details starts here........
    const handleShowDetails=(history)=>{

        props.navigation.navigate("purchasehistory",{
            history:history
        });
    }
    //Handle show details ends here..........


    //compute History Bill starts here......
    const computeHistoryBill=(history)=>{

        let bill=0;
        history.products.forEach(elem => {
            bill=bill+(elem.qty*elem.price);
            
        });
        return parseFloat(bill).toFixed(2);

    }
    //compute History Bill ends here........

    //Loading history starts ......
    const loadMyHistory=async ()=>{

        //enabling bufferring....
        setAppState(2);

        //config.....
        const config={headers:{'Content-Type':'application/json','b-auth-humtoken':token_RP}};

        //body starts...
        const body=JSON.stringify({buyerId:id_RP});

        //try catch starts.......
        try
        {
            const res=await axios.post(API.server+"/buyer/request/history",body,config);

            if(res)
            {
                setAppState(1);
                setHistoryState([...res.data.data]);
                console.log("HISTROY STATE");
                console.log(res.data.data);

            }
            else
            {
                setAppState(3);
                setErrorState("NETWORK ERROR");
            }
        }
        catch(err)
        {
            setAppState(3);
            if(err.response)
            {
                setErrorState(err.response.data.errorMessage);
            }
            else
            {
                setErrorState(err.message);
            }
        }
        //try catch ends..........
    }
    //Loading History ends.........



    //Main GUI man starts here.........
    let mainGUI=null;

    if(appState===2)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    else
    if(appState===3)
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.errorView}>
                    <Text style={styles.error}>{errorState}</Text>
                </View>
            </React.Fragment>
        );
    }
    else
    if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.container}>
                    
                    {/* Title View Starts Here...... */}
                    <View style={styles.parent}>
                        <View style={styles.child}>
                            <Text style={styles.title}>
                                MY PURCHASES
                            </Text>
                        </View>
                    </View>
                    {/* Title View Ends Here........ */}


                    {
                        historyState.length===0?(
                            <View style={styles.errorView}>
                                <Text style={styles.emptyError}>YOU HAVE NOT PURCHASED ANYTHING YET</Text>
                            </View>
                        ):(
                            <ScrollView style={styles.scrolling}>
                                   
                                    {
                                        historyState.map(((elem,index)=>{

                                            return (
                                                <TouchableOpacity key={index} style={styles.listView} activeOpacity={0.5} onPress={()=>{handleShowDetails(elem)}}>
                                                    <View style={styles.circleView}>
                                                        <Text style={styles.circleText}>{elem.outletName[0].toUpperCase()}</Text>
                                                    </View>
                                                    <View style={styles.dateView}>
                                                        <Text style={styles.dateText}>{elem.date}</Text>
                                                    </View>
                                                    <View style={styles.billView}>
                                                        <Text style={styles.billText}>{"Rs: "+computeHistoryBill(elem)}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }))
                                    }
                            </ScrollView>
                        )
                    }

                </View>
            </React.Fragment>
        );
    }
    //Main GUI man ends here...........

    //return statement starts here.....
    return (
        <React.Fragment>

            {/* Registering navigation event starts...... */}
            <NavigationEvents 
                onDidFocus={loadMyHistory}
            />
            {/* Registering navigation events end......... */}
            
            {mainGUI}
        </React.Fragment>
    );
    //return statement ends here.......

}//................................
const styles=StyleSheet.create({
    container:{
        flex:1
    },

    errorView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    error:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'red'
    },
    emptyError:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'green',
        fontWeight:'bold'
    },

    parent:{
        width:'100%',
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },

    child:{
        padding:5,
        borderWidth:1,
        borderColor:Color.welcomeBack
    },

    title:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.welcomeBack
    },

    scrolling:{
        flex:1,
        marginTop:20,
        paddingLeft:20,
        paddingRight:20
    },


    listView:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        padding:10,
        justifyContent:'flex-start'
    },

    circleView:{
        width:60,
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'purple'
    },


    circleText:{
        fontFamily:'roboto-regular',
        fontSize:17,
        fontWeight:'bold',
        color:'white'
    },

    dateView:{
        padding:5,
        marginTop:7,
        marginLeft:3,
        flexDirection:'row',
        justifyContent:'center'
    },

    dateText:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.success,
    },

    billView:{
        padding:5,
        marginTop:7,
        marginLeft:7,
        flexDirection:'row',
        justifyContent:'center'
    },

    billText:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.primary
    }
});

export default MainHistoryScreen;