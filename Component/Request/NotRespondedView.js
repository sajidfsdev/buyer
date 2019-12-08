import React,{ useState } from 'react';
import { View,Text,StyleSheet,Button,ScrollView,Alert } from 'react-native';
import Color from '../../Constants/Colors';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import API from '../../Constants/API';
import * as Actions from '../../Store/Actions/Request';
import * as Types from '../../Store/Types/Request';
import { useSelector,useDispatch } from 'react-redux';
import AppLoading from '../../Reusable/AppLoading';

const NotResponded=(props)=>{

    const [tableHead,setTableHead]=useState(['Item','Price','Qty','Sum']);
    const dispatch=useDispatch();
    const id_RP=useSelector(state=>state.auth.id);
    const token_RP=useSelector(state=>state.auth.token);
    const [appState,setAppState]=useState(1);//1 normal
                                             //2 loading

    //Handle Re issue request starts here......
    const handleReissueRequest=async ()=>{
     
        setAppState(2);

            //config setup....
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'b-auth-humtoken':token_RP
                }
            };


           



            //body setup.......
            const body=JSON.stringify({
                buyerId:props.request.buyerId,
                vendorId:props.request.vendorId,
                products:[...props.request.products],
                status:"PENDING"
            });


            //try catch starts here......
            try
            {
                const res=await axios.post(API.server+"/buyer/request/reissue",body,config);

                if(res)
                {
                    setAppState(1);
                    props.reload();
                    //props.navigation.navigate("request");
                }
                else
                {
                    setAppState(1);
                    Alert.alert("Failed","Could Not Issue Request Due To Network Error");
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
            //try catch ends here........
    }
    //Handle Re Issue Request ends here........



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

     //Compute starts here....
     const computeTotal=()=>{
        let total=0;
        props.request.products.forEach(prod => {
            total=parseFloat(total=total+(prod.price*prod.qty));
        });
        return total;
    }
    //Compute ends here......

    let mainGUI=null;

    if(appState===2)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    else if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                            <ScrollView style={{flex:1}}>
            <View style={styles.container}>
                
                {/* Title view starts here... */}
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                            Timed Out !
                    </Text>
                </View>
                {/* Title View ends here..... */}



                {/* Sub View Title... */}
                <View style={styles.subTitleView}>
                    <Text style={styles.subTitleText}>
                        Unable To Get Any Response From Vendor
                    </Text>
                </View>
                {/* Sub View Title... */}


                
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




                {/* Button View Starts Here.... */}
                <View style={styles.btnView}>
                    <Button 
                        style={styles.reissueBtn}
                        onPress={handleReissueRequest}
                        color={Color.success}
                        title="Re-Issue"
                    />
                    <Button 
                        style={styles.deleteBtn}
                        onPress={handleDeleteRequest}
                        color={Color.danger}
                        title="Delete"
                    />
                </View>
                {/* Button View ends here...... */}


            </View>
            </ScrollView>
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

}//..........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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
        backgroundColor:Color.welcomeBack,
        flexDirection:'row',
        justifyContent:'center'
    },

    head: { height: 40, backgroundColor:Color.welcomeBack },
    text: { margin: 6,color:'black' },


    getText:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    },


    titleView:{
        width:'100%',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },



    titleText:{
        fontFamily:'roboto-regular',
        color:Color.danger,
        fontSize:30
    },


    btnView:{
        width:'100%',
        paddingLeft:40,
        paddingRight:40,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },


    reissueBtn:{
        color:Color.success,
        padding:5
    },


    deleteBtn:{
        color:Color.danger,
        padding:5
    },


    subTitleView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        padding:20
    },

    subTitleText:{
        fontFamily:'roboto-regular',
        fontSize:17
    }
});



export default NotResponded;