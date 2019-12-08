import React,{ useEffect,useState } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,ScrollView,Alert } from 'react-native';
import Color from '../Constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AutoHeightImage from 'react-native-auto-height-image';
import API from '../Constants/API';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from './HeaderBtn';

import { useSelector,useDispatch } from 'react-redux';
import * as WishActions from '../Store/Actions/Wish';
import axios from 'axios';

import SpinnerBtn from '../Reusable/SpinnerBtn';
import AppLoading from '../Reusable/AppLoading';

import { NavigationEvents } from 'react-navigation';

const ProductDetails=(props)=>{

    //dispatch....
    const dispatch=useDispatch();

    //state management starts here...
    const [appState,setAppState]=useState(1);
                                            //1 loading
                                            //2 setted
    const [currentPicState,setCurrentPicState]=useState(1);
    const [wishState,setWishState]=useState(1);//1 means default.....show btn
                                               //2 means buffering
                                               //3 wishlisted
                                               //4 means hidden
    const [cartState,setCartState]=useState(1);//1 means default
                                               //2 means buffering
                                               //3 means carted
    //state management ends here.....


    //Redux state management starts here....
    const token_RP=useSelector(state=>state.auth.token);
    const id_RP=useSelector(state=>state.auth.id);
    //Redux state managemet  ends here......

    //use effect starts here....
    useEffect(()=>{
        console.log("See product details from product details screen");
        console.log("***********************************************");
        console.log("trying to product vendorId");
        if(props.navigation.getParam("product").vendorId._id===undefined)
        {
            console.log("Null condition detetcted");
            console.log(props.navigation.getParam("product").vendorId);
        }
        else
        {
            console.log("No Null detected");
            console.log(props.navigation.getParam("product").vendorId._id);
        }
        //getProductStatusInfo();
    },[]);
    //use effect ends here......


    //retrieving info starts here.....
    const getProductStatusInfo=async ()=>{
        setAppState(1);
        //config starts here......
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };


        //body starts here.....
        const body=JSON.stringify({
            buyerId:id_RP,
            productId:props.navigation.getParam("product")._id
        });


        //try catch starts here......
        try
        {
            const res=await axios.post(API.server+"/buyer/wishlist/info",body,config);

            if(res)
            {
                if(res.data.response.wish===true && res.data.response.cart===true)
                {
                    setWishState(4);
                    setCartState(3);
                }
                else if(res.data.response.cart===true)
                {
                    setCartState(3);
                    setWishState(4);
                }
                else
                if(res.data.response.wish===true)
                {
                    setWishState(3);
                    setCartState(1);
                }
                else if(res.data.response.wish===false)
                {
                    setWishState(1);
                    setCartState(1);
                }
               
                setAppState(2);
                

            }
            else
            {
                setAppState(2);
                setWishState(1);
            }

        }
        catch(err)
        {
            setAppState(2);
            setWishState(1);
            if(err.response)
            {
                if(err.response.data.errorMessage==="NF")
                {
                    //Alert.alert("ITS Ok","No Record");
                }
                else
                {
                    Alert.alert("ErrorResp",err.response.data.errorMessage);
                }

            }
            else
            {
                Alert.alert("error",err.message);
            }
        }
        //try catch ends here........
    }
    //retrieving info ends here.......


    //Moving functions starts here.....
    const moveToWishList=async ()=>{

        setWishState(2);

        //config starts here...
        const config={
            headers:{
                'Content-Type':'application/JSON',
                'b-auth-humtoken':token_RP
            }
        };


        //body formation starts here.....
        const body=JSON.stringify({
            buyerId:id_RP,
            productId:props.navigation.getParam('product')._id
        });



        //try catch starts here.....
        try
        {
            const res=await axios.post(API.server+"/buyer/wishlist/add",body,config);

            if(res)
            {
                setWishState(3);
                //dispatching an action....
                //console.log("Very important response has come from server.................");
                //console.log(res.data.data);
                //dispatch(WishActions.handleAddOneWish(res.data.data));
                //Alert.alert("RES","RES has come");
            }
            else
            {
                setWishState(1);
                Alert.alert("Failed","Cannot Be WishListed Due To Network Error");
            }

        }
        catch(err)
        {
            setWishState(1);
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
        
    }//move to wishlist called here.....


    const moveToCat=async ()=>{
        
        setCartState(2);
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };

        let vendorId=null;
        if(props.navigation.getParam("product").vendorId._id===undefined)
        {
            //console.log("Null condition detetcted");
           vendorId= props.navigation.getParam("product").vendorId;
        }
        else
        {
            //console.log("No Null detected");
            vendorId=props.navigation.getParam("product").vendorId._id;
        }



        const body=JSON.stringify({
            buyerId:id_RP,
            productId:props.navigation.getParam('product')._id,
            vendorId:vendorId
        });


        //try catch starts here........
        try
        {
            const res=await axios.post(API.server+"/buyer/wishlist/addToCart",body,config);

            if(res)
            {
                setCartState(3);
                setWishState(4);

            }
            else
            {
                setCartState(1);
                Alert.alert("Failed","Could Not Add Product To Cart");
            }

        }
        catch(err)
        {
            setCartState(1);
            if(err.response)
            {
                Alert.alert("Failed",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("Failed",err.message);
            }
        }
        //try catch ends here..........
    }
    //Moving functions ends here.......


    //handle move left starts here...
    const handleMoveLeft=()=>{
        console.log("Move left called");
        if(currentPicState===1)
        {
            return
        }
        else
        {
            setCurrentPicState((nextState,nextProps)=>{
                return nextState-1;
            });
        }
    }
    //handle move left ends here.....


    //handle move right starts here....
    const handleMoveRight=()=>{

        console.log("move right called");

        if(currentPicState===props.navigation.getParam("product").imgArr.length)
        {
            return
        }
        else
        {
            setCurrentPicState((nextState,nextProps)=>{
                return nextState+1;
            });
        }
    }
    //handle move right ends here......


    //Dim View Manipulation starts here...
    let dimView=null;

    if(props.navigation.getParam("product").dimensions.length > 0)
    {
        dimView=(
            <React.Fragment>
                <View style={styles.dimHeadingView}>
                    <Text style={styles.dimHeading}>Specifications</Text>
                </View>
                {
                    props.navigation.getParam("product").dimensions.map((elem,index)=>{
                        return (
                            <View key={index} style={styles.dimRowView}>
                                <Text style={styles.dim}>{elem.Dimension}</Text>
                                <Text style={styles.value}>{elem.Value}</Text>
                            </View>
                        );
                    })
                }
            </React.Fragment>
        );
    }
    else
    {
        dimView=(
            <View style={styles.noDimView}>
                <Text style={styles.noDim}>Specifications Not Available</Text>
            </View>
        );
    }
    //Dim View Manipulation ends here.....




    //Description View Starts Here........
    let descGUI=null;

    if(props.navigation.getParam("product").desc===" ")
    {
        descGUI=(
            <View style={styles.descView}>
                <Text style={styles.descTitle}>Description Not Available</Text>
            </View>
        );
    }
    else
    {
        descGUI=(
            <React.Fragment>
                <View style={styles.descView}>
                    <Text style={styles.descTitle}>Description</Text>
                </View>

                <View style={styles.descBottomView}>
                    <Text style={styles.descBottomText}>
                        {props.navigation.getParam("product").desc}
                    </Text>
                </View>
            </React.Fragment>
        );
    }
    //Description View Ends Here..........




    //wish Btn view man starts here.......
    let wishBtnView=null;

    if(wishState===1)
    {
        wishBtnView=(
            <TouchableOpacity onPress={moveToWishList} activeOpacity={0.5} style={styles.wishView}>
                    <Icon name="heart" size={20} color="white" />
            </TouchableOpacity>
        );
    }
    else if(wishState===2)
    {
        wishBtnView=(
            <SpinnerBtn 
            tostyles={styles.wishBufferingView}
            iconSize={20}
            iconColor="white"
             />
        );
    }
    else if(wishState===3)
    {
        wishBtnView=(
            <TouchableOpacity onPress={()=>{props.navigation.navigate('WISHLIST')}} activeOpacity={0.5} style={styles.wishlistedView}>
                    <Icon name="heart" size={20} color="white" />
                    <Icon name="check" size={20} color="white" />
            </TouchableOpacity>
        );
    }
    else if(wishState===4)
    {
        wishBtnView=(
            <TouchableOpacity activeOpacity={0.5} style={styles.hiddenView}>
                    <Icon name="heart" size={20} color="white" />
            </TouchableOpacity>
        );
    }
    //wish Btn view man ends here.........






    //Cart btn view man starts here........
    let cartBtnView=null;

    if(cartState===1)
    {
        cartBtnView=(
        <TouchableOpacity onPress={moveToCat} activeOpacity={0.5} style={styles.cartView}>
            <Icon name="shopping-cart" size={20} color="white" />
        </TouchableOpacity>
        );
    }
    else if(cartState===2)
    {
        cartBtnView=(
            <SpinnerBtn 
            tostyles={styles.wishBufferingView}
            iconSize={20}
            iconColor="white"
             />
        );
    }
    else if(cartState===3)
    {
        cartBtnView=(
        <TouchableOpacity onPress={()=>{props.navigation.navigate("CART")}} activeOpacity={0.5} style={styles.carted}>
            <Icon name="shopping-cart" size={20} color="white" />
            <Icon name="check" size={20} color="white" />
        </TouchableOpacity>
        );
    }
    //Cart btn view man ends here..........



    //Main GUI manipulation starts here......
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    else
    {
        mainGUI=(
            <React.Fragment>
                        <ScrollView style={styles.container}>


<View style={styles.outletNameView}>
    <Text style={styles.outletName}>
        {
            props.navigation.getParam("outletName")
        }
    </Text>
</View>


<View style={styles.picNumView}>

    <TouchableOpacity activeOpacity={0.5} style={styles.leftView} onPress={handleMoveLeft}>
        <Icon name="arrow-alt-circle-left" size={30} color={Color.primary} />
    </TouchableOpacity>

    <Text style={styles.picNum}>
        {currentPicState+"/"+props.navigation.getParam('product').imgArr.length}
    </Text>

    <TouchableOpacity activeOpacity={0.5} style={styles.rightView} onPress={handleMoveRight}>
        <Icon name="arrow-alt-circle-right" size={30} color={Color.primary} />
    </TouchableOpacity>
</View>




{/* Slider View Starts Here... */}
<View style={styles.sliderView}>
    <AutoHeightImage
        width={150}
        source={{uri:API.server+"/vendor/prodimg/"+props.navigation.getParam("product").imgArr[(currentPicState-1)]}}
    />
</View>
{/* Slider View Ends Here..... */}



{/* Price View starts here... */}
<View style={styles.priceView}>
    <Text style={styles.price}>{"Rs: "+props.navigation.getParam("product").price}</Text>
</View>
{/* Price View Ends Here..... */}


{/* Desc View Starts Here... */}
{descGUI}
{/* Desc View ends here... */}


{/* Dimension Heading starts here.... */}
{dimView}
{/* Dimension Heading ends here...... */}


{/* Add To Cart Starts Here... */}
<View style={styles.btnView}>
    {wishBtnView}

    {cartBtnView}
</View>
{/* Add To Cart Ends Here..... */}

</ScrollView>
            </React.Fragment>
        );
    }
    //Main GUI manipulation ends here........




    //return statement starts here...
    return (
        <React.Fragment>
            <NavigationEvents 
            onDidFocus={()=>{
                getProductStatusInfo();
            }}
            />
            {mainGUI}
        </React.Fragment>
    );
    //return statement ends here.....

}//.............................

const styles=StyleSheet.create({
    container:{
        flex:1
    },


    picNumView:{
        width:'100%',
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },


    picNum:{
        fontFamily:'roboto-regular',
        fontSize:18,
        fontWeight:'bold',
        color:Color.welcomeBack

    },


    leftView:{

    },


    rightView:{

    },


    sliderView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    },


    priceView:{
        width:'100%',
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center'
    },


    price:{
        fontFamily:'roboto-regular',
        fontWeight:'bold',
        fontSize:17,
        color:Color.success
    },


    dimHeadingView:{
        width:'80%',
        marginTop:20,
        marginLeft:'10%',
        marginRight:'10%',
        padding:3,
        backgroundColor:Color.primary,
        flexDirection:'row',
        justifyContent:'center'
    },


    dimHeading:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'white'
    },


    dimRowView:{
        width:'80%',
        marginLeft:'10%',
        marginRight:'10%',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },


    dim:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:Color.primary
    },


    value:{
        fontFamily:'roboto-regular',
        fontSize:15
    },


    noDimView:{
        width:'80%',
        marginLeft:'10%',
        marginRight:'10%',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:Color.primary,
        marginTop:20,
        padding:3
    },

    noDim:{
        fontFamily:'roboto-regular',
        color:'white'
    },


    btnView:{
        width:'80%',
        marginLeft:'10%',
        marginRight:'10%',
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },


    wishView:{
        width:50,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"red"
    },

    hiddenView:{
        width:50,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"red",
        display:'none'
    },

    wishlistedView:{
        width:60,
        padding:5,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:2,
        backgroundColor:"red"
    },

    wishBufferingView:{
        width:50,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"gray"
    },


    cartView:{
        width:50,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.success
    },


    carted:{
        width:60,
        padding:5,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:2,
        backgroundColor:Color.success
    },


    descView:{
        width:'80%',
        marginLeft:'10%',
        marginRight:'10%',
        backgroundColor:Color.primary,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center',
        padding:3
    },


    descTitle:{
        fontFamily:'roboto-regular',
        color:'white',
        fontSize:17
    },

    descBottomView:{
        width:'80%',
        marginLeft:'10%',
        marginRight:'10%'
    },


    descBottomText:{
        fontFamily:'roboto-regular',
        fontSize:15
    },


    outletNameView:{
        width:'100%',
        backgroundColor:Color.welcomeBack,
        padding:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },


    outletName:{
        fontFamily:'roboto-regular',
        color:'white',
        fontSize:12
    }
});


//Setting navigation settings starts here....
ProductDetails.navigationOptions=(navigationData)=>{

    const name=navigationData.navigation.getParam('product').name;
    const vendorId=navigationData.navigation.getParam('product').vendorId;
    const outletName=navigationData.navigation.getParam("product").vendorId.outletName;

    //console.log("***************************AT REUSABLE SCREEN******************************************");
    //console.log(navigationData.navigation.getParam('product'))
    return {
        headerTitle:name,
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>

                <Item 
                    title="home"
                    iconName="home"
                    onPress={()=>{
                        navigationData.navigation.navigate("cat");
                    }}
                />

                <Item title="shop" iconName="store" onPress={()=>{
                    navigationData.navigation.navigate("shop",{vendorId:vendorId,outletName:outletName});
                }}  />
            </HeaderButtons>
        )
    };
}
//setting navigation setting ends here.......

export default ProductDetails;