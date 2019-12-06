import React,{ useState,useEffect } from 'react';
import { Text,View,StyleSheet,TextInput,FlatList,TouchableOpacity,Alert } from 'react-native';

import Color from '../Constants/Colors';
import { useSelector } from 'react-redux';
import axios from 'axios';
import API from '../Constants/API';
import AppLoading from '../Reusable/AppLoading';
import AutoHeightImage from 'react-native-auto-height-image';
import Fuse from 'fuse.js';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../Reusable/HeaderBtn';

const ProdSearchView=(props)=>{

    //state management starts here....
    const [searchState,setSearchState]=useState('');
    const [containerState,setContainerState]=useState([]);
    const [productsState,setProductsState]=useState([]);
    const [appState,setAppState]=useState(1);//1 loading 2 success 3 error
    const [errorState,setErrorState]=useState('');
    //state management ends here......


    //Redux props starts here...
    const cat_RP=useSelector(state=>state.cat.cat);
    const subCat_RP=useSelector(state=>state.cat.subCat);
    const subSubCat_RP=useSelector(state=>state.cat.subSubCat);
    const token_RP=useSelector(state=>state.auth.token);
    //Redux props ends here.....


    //Use effect starts here.....
    useEffect(()=>{
        fetchAllProds();
    },[]);
    //use effect ends here.......


    //Move to map starts here...
    const moveToMap=(name)=>{
        props.navigation.navigate("prodbyprodmap",{name:name});
    }
    //Move to map ends here.....


    //Fetch all prods starts here....
    const fetchAllProds=async ()=>{

        //config.......
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };


        //body starts here....
        const body=JSON.stringify({
            cat:cat_RP,
            subCat:subCat_RP,
            subSubCat:subSubCat_RP
        });

        console.log("About to send beautiful responsee");

        //try catch starts here....
        try
        {
            const res=await axios.post(API.server+"/buyer/search/searchProdByProd",body,config);

            if(res)
            {
                //Filtering the data......Possible Duplication
               let arr=[];

               res.data.products.forEach(elem=>{
                   
                if(arr.length===0)
                {
                    arr.push(elem);
                }
                else
                {
                    let dupStatus=false;
                    arr.forEach(e=>{
                        if(e.name===elem.name)
                        {
                            dupStatus=true;
                        }
                    });

                    if(dupStatus===false)
                    {
                        arr.push(elem);
                    }
                }
               });

               setContainerState([...arr]);
               setProductsState([...arr]);
               setAppState(2);
            }
            else
            {
                setAppState(3);
                setErrorState("Could Not Fetch Products")
            }
        }
        catch(err)
        {
            if(err.response)
            {
                setAppState(3);
                setErrorState(err.response.data.errorMessage);
            }
            else
            {
                setAppState(3);
                setErrorState(err.message);
            }
        }
        //try catch ends here......
    }
    //Fetch all prods ends here......


    //Handle product searching starts here...
    const handleProductSearching=(search)=>{
        setSearchState(search);

        var options = {
            keys: ['name'],
            id: 'name',
            weight: 0.7
        }
       var fuse = new Fuse(productsState, options)
      
       const res=fuse.search(search);

       if(res.length===0)
       {
`          `    //Filtering the data......Possible Duplication
let arr=[];

containerState.forEach(elem=>{
    
 if(arr.length===0)
 {
     arr.push(elem);
 }
 else
 {
     let dupStatus=false;
     arr.forEach(e=>{
         if(e.name===elem.name)
         {
             dupStatus=true;
         }
     });

     if(dupStatus===false)
     {
         arr.push(elem);
     }
 }
});

            setProductsState([...arr]);
       }
       else
       {
           let arr=[];

            res.forEach(elem=>{
                containerState.forEach(e=>{
                    if(e.name===elem)
                    {
                        arr.push(e);
                    }
                });
            });

            setProductsState([...arr]);
       }
    
    }
    //Handle product searching ends here.....



    //Main GUI Manipulation starts here....
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        
        );
    }
    else if(appState===2)
    {
        mainGUI=(
            <React.Fragment>
                 <View style={styles.container}> 
            
            {/* Top Bar starts here.... */}
            <View style={styles.navView}>
                <Text style={styles.nav}>
                    {
                        props.navigation.getParam("navString")
                    }
                </Text>
            </View>
            {/* Top Bar Ends Here...... */}



            {/* Search Field Starts Here... */}
            <View style={styles.searchView}>
                <TextInput 
                    value={searchState}
                    onChangeText={handleProductSearching}
                    style={styles.search}
                />
            </View>
            {/* Search Field Ends Here..... */}




            {/* Flat List Starts Here..... */}
            <FlatList
                style={styles.flatList} 
                data={productsState}
                keyExtractor={item=>item.name}
                numColumns={1}
                renderItem={(itemData)=>{
                    return (
                        <TouchableOpacity onPress={()=>{moveToMap(itemData.item.name)}} activeOpacity={0.5} style={styles.flatParentView}>
                            <AutoHeightImage
                                source={{uri:API.server+"/vendor/prodimg/"+itemData.item.imgArr[0]}}
                                width={100}
                            />
                            <View style={styles.nameView}>
                                <Text style={styles.name}>{itemData.item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                
            />
            {/* Flat List Ends Here....... */}



        </View>
            </React.Fragment>
        );
    }
    else
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.errorContainer}>
                    <Text style={styles.error}>{errorState}</Text>
                </View>
            </React.Fragment>
        );
    }
    //Main GUI manipulation ends here......

    //return starts here...
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
       
    );
    //return ends here.....

}//............................

const styles=StyleSheet.create({
    container:{
        flex:1
    },


    navView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:1,
        backgroundColor:Color.welcomeBack
    },


    nav:{
        fontFamily:'roboto-regular',
        color:'white',
        marginRight:2
    },

    searchView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20
    },


    search:{
        width:'80%',
        borderWidth:1,
        padding:7,
        fontFamily:'roboto-regular',
        fontSize:18
    },


    errorContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },


    error:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:"red"
    },


    flatList:{
        flex:1,
        width:'80%',
        marginLeft:'10%',
        marginRight:'10%',
        marginTop:20
    },


    flatParentView:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20
    },

    nameView:{
        height:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },


    name:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.success,
        marginTop:5
    },


    price:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:Color.primary
    }
});;

ProdSearchView.navigationOptions=(navigationData)=>{
    return {
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item 
                    title="home" iconName="home" onPress={()=>{
                        navigationData.navigation.navigate("cat");
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default ProdSearchView;