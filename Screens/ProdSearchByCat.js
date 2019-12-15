import React,{ useEffect,useState } from 'react';
import { View,Text,StyleSheet,TextInput,FlatList,TouchableOpacity } from 'react-native';
import axios from 'axios';
import API from '../Constants/API';
import AppLoading from '../Reusable/AppLoading';
import AutoHeightImage from 'react-native-auto-height-image';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../Reusable/HeaderBtn';

import Fuse from 'fuse.js';

import { useSelector } from 'react-redux';
import Color from '../Constants/Colors';

const ProdSearchByCat=(props)=>{

    //use selector starts here....
    const token_RP=useSelector(state=>state.auth.token);
    const cat_RP=useSelector(state=>state.cat.cat);
    const subCat_RP=useSelector(state=>state.cat.subCat);
    const subSubCat_RP=useSelector(state=>state.cat.subSubCat);
    //use selector ends here......


    //state management starts here....
    const [appState,setAppState]=useState(1);//1 loading 2 success 3 error
    const [errState,setErrorState]=useState("");
    const [prodState,setProdState]=useState([]);
    const [imgWidthState,setImageWidthState]=useState(150);
    const [imgHeightState,setImageHeightState]=useState(150);
    const [searchState,setSearchState]=useState('');
    const [containerState,setContainerState]=useState([]);
    //state managment ends here.......


    //use effect starts here......
    useEffect(()=>{
        fetchAllProducts();
    },[]);
    //use effect ends here........


    //conat handle Next starts here...
    const handleNext=(product)=>{
        props.navigation.navigate("productdetail",{product:product,outletName:props.navigation.getParam('outletName')});
    }
    //handle next ends here...........


    //Method to Handle Search starts here....
    const handleProdSearch=(search)=>{
        
        setSearchState(search);

        var options = {
        keys: ['name'],
        id: 'name',
        weight: 0.7
    }
   var fuse = new Fuse(containerState, options)
  
   const res=fuse.search(search);

   if(res.length===0)
   {
       setProdState([...containerState]);
       
   }
   else
   {
       //console.log("Special Attention))))))))))))))))))))))))))))))))");
       //console.log(res);
       let arr=[];

       res.forEach(elem=>{
           containerState.forEach(sec=>{
               if(sec.name===elem)
               {
                   arr.push(sec);
               }
           });
       });
       
       setProdState([...arr]);
   }


    }
    //Method to Handle Search ends here......


    //Method for fetchhing all the products starts here...
    const fetchAllProducts=async ()=>{

        //body formation starts here...
        const body=JSON.stringify({
            token:token_RP,
            cat:cat_RP,
            subCat:subCat_RP,
            subSubCat:subSubCat_RP,
            vendorId:props.navigation.getParam("vendorId")
        });


        //Setting some configuration....
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };

        //try catch starts here........
        try
        {
            
            const res=await axios.post(API.server+"/buyer/search/searchProdsByCat",body,config);

            if(res)
            {
                console.log("Response Has ^^^^^^^^^^^^^^^^^^^^^^^");
                console.log(res.data.products);
                setProdState([...res.data.products]);
                setContainerState([...res.data.products]);
                setAppState(2);
            }
            else
            {
                setAppState(3);
                setErrorState("Could Not Retrieve Products. Please try again");
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
        //try catch ends here.....
    }
    //Method for fetching all the roducts ends here.......


    //Main GUI manipulation starts here.....
    let mainGUI=null;
    if(appState===1)
    {
        mainGUI=(<AppLoading />);
    }
    else
    if(appState===2)
    {
        mainGUI=(
            <View style={styles.container}>
                <View style={styles.navigateView}>
                    <Text style={styles.navigate}>{props.navigation.getParam("headerText")}</Text>
                </View>


                <View style={styles.searchView}>
                    <TextInput value={searchState} onChangeText={handleProdSearch} style={styles.search} placeholder="Search Items" />
                </View>


                <View style={styles.flatView}>
                    <FlatList
                        data={prodState}
                        keyExtractor={(item)=>{return item.name}}
                        numColumns={1}
                        renderItem={(itemData)=>{
                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={()=>{handleNext(itemData.item)}} style={styles.flatContainer}>

                                    {/* <View style={styles.flatImageContainer}> */}
                                        <AutoHeightImage 
                                        source={{uri:API.server+"/vendor/prodimg/"+itemData.item.imgArr[0]}} 
                                        width={100}
                                        />
                                    {/* </View> */}
                                    
                                    <View style={styles.flatNameContainer}>
                                        <Text style={styles.flatName}>{itemData.item.name}</Text>
                                        <Text style={styles.flatPrice}>{"Rs: "+itemData.item.price}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        
                    />
                </View>
            </View>
        );
    }
    else
    {
        mainGUI=(
            <View style={styles.errorView}>
                <Text style={styles.errorMessage}>{errState}</Text>
            </View>
        );
    }
    //Main GUI Manipulation Ends Here.......

    //return starts here....
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here......
}//.............................



const styles=StyleSheet.create({
    container:{
        flex:1
    },


    navigateView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        backgroundColor:Color.welcomeBack,
        padding:1
    },


    navigate:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white',
        marginRight:2
    },


    searchView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:30
    },

    search:{
        width:'80%',
        borderWidth:1,
        padding:7,
        fontSize:18,
        fontFamily:'roboto-regular',
        borderRadius:5
    },


    errorContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },



    error:{
        fontFamily:'roboto-regular',
        color:"red"
    },


    flatView:{
        marginTop:30,
        flex:1,
        width:'80%',
        marginLeft:"auto",
        marginRight:'auto'
    },


    flatContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
        marginBottom:30
    },

    flatImageContainer:{
        width:150,
        padding:1
    },


    flatImage:{
        
    },

    flatNameContainer:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5
    },

    flatName:{
        fontFamily:'roboto-regular',
        fontSize:17,
        fontWeight:'bold',
        color:Color.primary

    },


    flatPrice:{
        fontFamily:'roboto-regular',
        fontSize:15,
        fontWeight:'bold',
        color:Color.success,
        marginTop:2
    },


    errorView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },


    errorMessage:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'red'
    }
    

});

ProdSearchByCat.navigationOptions=(navigationData)=>{
    const outletName=navigationData.navigation.getParam("outletName");
    
    return {
        headerTitle:outletName,
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item 
                    title="home" iconName="home" onPress={()=>{
                        navigationData.navigation.navigate("cat");
                    }}
                />

                <Item title="shop" iconName="store" onPress={()=>{
                    navigationData.navigation.navigate("shop",{vendorId:navigationData.navigation.getParam("vendorId"),outletName:outletName});
                }}  />
            </HeaderButtons>
        )
    }
}

export default ProdSearchByCat;