import React,{ useState,useEffect } from 'react';
import { Text,View,StyleSheet,FlatList,TouchableOpacity,Alert } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import AppLoading from '../Reusable/AppLoading';
import * as Actions from '../Store/Actions/Shop';
import * as Types from '../Store/Types/Shop';
import AutoHeightImage from 'react-native-auto-height-image';
import image from '../assets/one.jpg';
import Color from '../Constants/Colors';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../Reusable/HeaderBtn';


const Shop=(props)=>{

    //use selector starts here....
    const token_RP=useSelector(state=>state.auth.token);
    const products_RP=useSelector(state=>state.shop.products);
    const loaded_RP=useSelector(state=>state.shop.loaded);
    const error_RP=useSelector(state=>state.shop.error);
    const errorMessage_RP=useSelector(state=>state.shop.errorMessage);
    const vendorCat_RP=useSelector(state=>state.shop.cat);

    const dispatch=useDispatch();
    //use selector ends here......

    //state mnagement starts here....
    const [appState,setAppState]=useState(1);//1 loading 2 
    //state management  edns here....


    //Array ............
    let colorArr=[
        "#22b536",
        "#1ea68b",
        "#a61ea6",
        "#a61e40",
        "#a39c1c",
        "#ba690d",
        "#052c5c"
    ];
    //Array ends .......


    //Array Counter....
    let counter=0;


    const handleColors=()=>{

        if(counter<colorArr.length)
        {
            let clr= colorArr[counter];
            counter=counter+1;
            return clr;
        }
        else
        {
            counter=0;
            let clr= colorArr[counter];
            counter=counter+1;
            return clr;
        }

        //return "blue";
    }//.................................


    //Handle Move To Next Starts Here.......
    const moveToNext=(cat)=>{
        //Checking for subCat..........
        let subCat=[];
        let noSubCat=false;

        products_RP.forEach(elem=>{
            if(elem.cat===cat)
            {
                if(elem.subCat==="not available")
                {
                    noSubCat=true;
                    //return Alert.alert("No subcat","No subCat");
                    props.navigation.navigate("shopProductList",{
                        vendorId:products_RP[0].vendorId,
                        outletName:props.navigation.getParam("outletName"),
                        cat:cat,
                        subCat:"not available",
                        subSubCat:"not available"
                    });
                    
                }
                else
                {
                    if(subCat.length===0)
                    {
                        subCat.push(elem.subCat);
                    }
                    else
                    {
                        //checking for possible duplication
                        let duplicate=false;
                        subCat.forEach(c=>{
                            if(elem.subCat===c)
                            {
                                duplicate=true;
                            }
                        });

                        if(duplicate===false)
                        {
                            subCat.push(elem.subCat);
                        }
                    }
                }
            }
        });//for each ends here..............

        if(noSubCat===false)
        {
        console.log("******************************subCat Calculated Array Are");
        console.log(subCat);

        props.navigation.navigate("shopSubCat",{
            vendorId:products_RP[0].vendorId,
            outletName:props.navigation.getParam("outletName"),
            cat:cat,
            subCat:[...subCat],
            headerText:cat
        });

        }
        

    }
    //Handle Move To Next Ends Here.........


    //use effect starts here.....
    useEffect(()=>{

            //dispatching for buffering......
            dispatch({type:Types.STARTBUFFERING});

            const vendorId=props.navigation.getParam('vendorId');

            //dispatching an action....
            dispatch(Actions.fetchAllVendorProducts(vendorId,token_RP));
    },[]);
    //use effect ends here.......


    //Main GUI starts here.....
    let mainGUI=null;


    //switch statement starts here....
    if(loaded_RP===false)
    {
        mainGUI=(<AppLoading />);
    }
    else
    {
        if(error_RP===true)
        {
            mainGUI=(
                <View style={styles.errorView}>
                    <Text style={styles.error}>{errorMessage_RP}</Text>
                </View>
            );
        }
        else
        {
            
            mainGUI=(
                <View style={styles.container}>
                    <View style={styles.imageView}>
                    <AutoHeightImage
                        width={200}
                        source={image}
                        />

                    <View style={styles.titleView}>
                        <Text style={styles.shopTitle}>
                            {props.navigation.getParam('outletName')}
                        </Text>
                        <Text style={styles.shopSubTitle}>
                            Offers Products In
                        </Text>
                    </View>
                    </View>




                    {/* Flat list starts here... */}
                    <FlatList
                        style={styles.FlatList}
                        data={vendorCat_RP}
                        numColumns={3}
                        keyExtractor={(itemData)=>itemData}
                        renderItem={(itemData)=>{
                            return (
                               
                                    <View style={styles.flatView}>
                                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{moveToNext(itemData.item)}}>
                                            <View style={{...styles.box,backgroundColor:handleColors()}}>
                                                <Text style={styles.boxCaption}>{itemData.item[0]}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={styles.boxTitle}>
                                            {itemData.item}
                                        </Text>
                                    </View>
                                    
                                
                            )
                        }}
                    />
                    {/* Flat List ends here..... */}
                </View>
            );
        }
    }
    //switch statements ends here.....
    //Main GUI ends here.......

    //return statement starts here.....
    return (
        <React.Fragment>
           {mainGUI}
        </React.Fragment>
    );
    //return statement ends here.......

}//...................

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
        color:'red',
        fontSize:15
    },


    imageView:{
        width:'100%',
        flexDirection:'row',
        paddingTop:1,
        justifyContent:'space-between'
    },


    title:{
        fontFamily:'roboto-regular',
        fontSize:15
        
    },


    titleView:{
        padding:1,
        justifyContent:'center',
        alignItems:'center',
        marginRight:2
    },


    shopTitle:{
        fontFamily:'roboto-regular',
        fontSize:17,
        fontWeight:'bold',
        color:Color.success
    },


    shopSubTitle:{
        fontFamily:'roboto-regular',
        fontSize:15
    },


    FlatList:{
        flex:1
    },


    flatView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },


    box:{
        width:80,
        height:80,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
    },


    boxCaption:{
        fontFamily:'roboto-regular',
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },


    boxTitle:{
        fontFamily:'roboto-regular',
        fontSize:12
    }


    
});


Shop.navigationOptions=(navigationData)=>{
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
            </HeaderButtons>
        )
    }
}

export default Shop;