import React,{ useState,useEffect } from 'react';
import { Text,View,StyleSheet,ScrollView,Alert } from 'react-native';
import AppLoading from '../Reusable/AppLoading';
import axios from 'axios';
import API from '../Constants/API';
import HeaderButton from '../Reusable/HeaderBtn';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationEvents } from 'react-navigation';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { useSelector } from 'react-redux';

const Wishlist=(props)=>{
    //state management starts here...
    const [appState,setAppState]=useState(1);//1 loading
                                             //2 success
                                             //3 Error
                                             //4 No Found
    const [errorState,setErrorState]=useState("");
    const [wishArrState,setWishArrState]=useState([]);

    const [currentWish,setCurrentWish]=useState({});
    const [wallState,setWallState]=useState(false);
    //state managamenet ends here....


    //redux props starts here.....
    const token_RP=useSelector(state=>state.auth.token);
    const id_RP=useSelector(state=>state.auth.id);
    //redux props ends here.......


    //color array starts here.....
    let colorArr=[
        "#22b536",
        "#1ea68b",
        "#a61ea6",
        "#a61e40",
        "#a39c1c",
        "#ba690d",
        "#052c5c"
    ];
    //color array ends here.......



     //Array Counter....
     let counter=0;


    //use effect starts here.....
    useEffect(()=>{
        //fetchAllWishlist();
    },[]);
    //use effect ends here.......


    //Method for deletion starts here......
    const deleteWish=async (elem)=>{
        setAppState(1);
        //config setup......
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };



        //body setup ....
        const body=JSON.stringify({
            buyerId:id_RP,
            productId:elem._id
        });



        //try catch starts here....
        try
        {
            const res=await axios.post(API.server+"/buyer/wishlist/deleteWish",body,config);

            if(res)
            {
                fetchAllWishlist();
            }
            else
            {
                setAppState(2);
                Alert.alert("Failed","Unable to get product deletion confirmation. Please refresh App");
            }
        }
        catch(err)
        {
            setAppState(2);
            if(err.response)
            {
                Alert.alert("Failed",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("Failed",err.message);
            }
        }
        //try catch ends here......
    }
    //Method for deletion ends here........



    //Method for showing details strts here....
    const showWishDetails=(elem)=>{
        //props.navigation.navigate("onlyProductDetail",{product:elem});
        
        
        Alert.alert(elem.name,"Please Show The Details Options",[
            {
                text:"Product Details",
                onPress:()=>{
                    props.navigation.navigate("onlyProductDetail",{
                        product:elem
                    })
                }
               
            },


            {
                text:"Vendor Details",
                onPress:async ()=>{
                    //Getting current location starts here......
                    const permission=await Permissions.askAsync(Permissions.LOCATION);

                    if(permission.status==='granted')
                    {
                        const loc=await Location.getCurrentPositionAsync({enableHighAccuracy:true});
            
                        if(loc)
                        {
                            let region={
                                latitude:loc.coords.latitude,
                                longitude:loc.coords.longitude,
                                latitudeDelta:0.085,//0.45
                                longitudeDelta:0.085//0.45
                            };


                            console.log("Please see the region before taking Off");
                            console.log("***************************************");
                            console.log(elem);
                            console.log("****************************************");

                            props.navigation.navigate("onlyVendorDetail",{
                                vendor:elem.vendorId,
                                region:region
                            });
                            
                        }
                        else
                        {
                            
                            Alert.alert("Unable To Get Location","Some Error Occurs While Retrieving Location");
                        }
                    }
                    else
                    {
                        
                        Alert.alert("Location Not Granted","Please Provide Access To Location");
                    }
                    //Getting current location ends here.......
                }
            }


    
        ]);
    }
    //Method for showing details ends here.....



    //Method for add to cart starts here.......
    const addWishToCart=async (elem)=>{
        
        //config setup....
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };



        ////body starts here........
        const body=JSON.stringify({
            buyerId:id_RP,
            productId:elem._id,
            vendorId:elem.vendorId._id
        });


        //try catch starts here......
        try
        {
            const res=await axios.post(API.server+"/buyer/wishlist/addToCart",body,config);

            if(res)
            {
                fetchAllWishlist();
            }
            else
            {
                Alert.alert("Failed","Could Not Add Product To Cart Due To Network Error");
            }
        }
        catch(err)
        {
            if(err.response)
            {
                Alert.alert("Failed",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("Failed",err.message);
            }
        }
        //try catch ends.............
    }
    //Method for add to cart ends here....


    //method for handling color starts here......
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
    }
    //Method for handling color ends here........


    //method for fetching all wishlist starts here.....
    const fetchAllWishlist=async ()=>{
        setAppState(1);
        //config setup....
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };



        //body setup .....
        const body=JSON.stringify({
            buyerId:id_RP
        });




        //try catch starts here.....
        try
        {
            const res=await axios.post(API.server+"/buyer/wishlist/getAllWishes",body,config);

            if(res)
            {
                console.log("res has come from wishlists......");
                console.log("Please check it out cearfully***************************");
                console.log(res.data.data);

                if(res.data.data.length===0)
                {
                    setAppState(4);
                }
                else
                {
                    setWishArrState([...res.data.data]);
                    setAppState(2);
                }

            }
            else
            {
                setAppState(4);
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
        //try catch ends here.......
    }
    //method for fetching all the wishlist ends here...



    //main gui man starts here....
    let mainGUI=null;

    if(appState===1)
    {
        //loading state..........
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    else 
    if(appState===2)
    {
        //wishlist data retrieved successfully....
        mainGUI=(
            <React.Fragment>
                <View style={styles.container}>
                    {/* Top most number view starts */}
                    <View style={styles.recordNumView}>
                        <Text style={styles.recordNum}>{wishArrState.length+" Wishes"}</Text>
                    </View>
                    {/* Top most number view ends  */}


                    {/* Scroll View starts here... */}
                    <ScrollView style={styles.scrollView}>
                    <View style={styles.scrollViewContainer}>
                        {
                            wishArrState.map((elem,index)=>{
                                return (
                                    <View key={index}  style={{...styles.scrollViewItem,backgroundColor:handleColors()}}>
                                        <Text style={styles.prodName}>{elem.name}</Text>
                                        <View style={styles.iconView}>
                                            <Icon 
                                                name="trash-alt"
                                                size={17}
                                                color="red"
                                                onPress={()=>{deleteWish(elem)}}
                                            />
                                            <Icon 
                                                name="calendar-week"
                                                size={17}
                                                color="white"
                                                onPress={()=>{showWishDetails(elem)}}
                                            />
                                            <Icon 
                                                name="shopping-cart"
                                                size={17}
                                                color="white"
                                                onPress={()=>{addWishToCart(elem)}}
                                            />
                                        </View>
                                    </View>
                                );
                            })
                        }
                    </View>
                    </ScrollView>
                    {/* Scroll View ends here..... */}
                </View>
            </React.Fragment>
        );

    }
    else
    if(appState===3)
    {
        //loaded with errors.....
        mainGUI=(
            <React.Fragment>
                <View style={styles.container}>
        <Text>{errorState}</Text>
                </View>
            </React.Fragment>
        );

    }
    else
    if(appState===4)
    {
        //loaded with empty......
        mainGUI=(
            <React.Fragment>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Your WishList is Empty</Text>
                </View>
            </React.Fragment>
        );
        

    }
    //main gui man ends here......




    //Front wall strts here.....
    let frontWall=null;
    let backWall=null;
    if(wallState===true)
    {
        frontWall=(
            <View style={styles.frontWall}>
                <Text>Front wall text</Text>
            </View>
        );

        backWall=(
            <View style={styles.backWall}>

            </View>
        );
    }
    //Front wall ends here......

    return (
        <React.Fragment>
            
            <NavigationEvents
      onDidFocus={(payload)=>{
            fetchAllWishlist();
      }}
            />

            {mainGUI}
        </React.Fragment>
    );

}//.......................

const styles=StyleSheet.create({
    container:{
        flex:1
    },


    emptyContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    emptyText:{
        fontFamily:'roboto-regular',
        color:'red',
        fontWeight:'bold',
        fontSize:17
    },


    recordNumView:{
        width:'100%',
        padding:3,
        flexDirection:'row',
        justifyContent:'flex-end'
    },


    recordNum:{
        fontFamily:'roboto-regular',
        color:"green",
        fontWeight:'bold',
        fontSize:17,
        marginRight:3
    },


    scrollView:{
        flex:1
    },

    scrollViewContainer:{
        flex:1,
        paddingLeft:20,
        paddingRight:20
    },


    scrollViewItem:{
        width:'100%',
        padding:10,
        marginTop:15,
        borderRadius:15,
        flexDirection:'row',
        justifyContent:'space-between'
    },


    prodName:{
        color:'white'
    },


    iconView:{
        width:100,
        flexDirection:'row',
        justifyContent:'space-between'
    },

    frontWall:{
        width:'100%',
        height:200,
        zIndex:100,
        position:'absolute',
        marginLeft:20,
        marginRight:20

    },


    backWall:{
        flex:1,
        zIndex:50,
        backgroundColor:"rgba(0,0,0,0.5)"
    }
});


//navigation settinggs starts here......
Wishlist.navigationOptions=(navigationData)=>{
    return {
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="menu"
                    iconName="bars"
                    color="white"
                    onPress={()=>{
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
}
//navigation settings ends here..........

export default Wishlist;