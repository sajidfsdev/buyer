import React,{ useState } from 'react';
import { Text,View,StyleSheet,ScrollView,Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import API from '../Constants/API';
import { useSelector } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import AppLoading from '../Reusable/AppLoading';
import Color from '../Constants/Colors';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Cart=(props)=>{

    //state management starts here.....
    const token_RP=useSelector(state=>state.auth.token);
    const id_RP=useSelector(state=>state.auth.id);
    const [appState,setAppState]=useState(1);//1 loading
                                             //2 success
                                             //3 error
    const [errState,setErrorState]=useState("");
    const [cartList,setCartList]=useState([]);

    const [qtyState,setQtyState]=useState([]);
    const [sumState,setSumState]=useState([]);
    const [totalState,setTotalState]=useState(0);
    //state management ends here.......



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


         //compute cat string starts here.....
         const computeCatString=(product)=>{
            let catString=product.cat;

            if(product.subCat !== 'not available')
            {
                catString+=product.subCat;
            }

            if(product.subSubCat !== 'not available')
            {
                catString+=product.subSubCat;
            }

            return catString;

         }
         //compute cat string ends here.......


         //Issue request starts here..............
         const issueRequest=async ()=>{

            setAppState(1);

            //config setup....
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'b-auth-humtoken':token_RP
                }
            };


            //setting array required....
            let products=[];
            let index=0;

            cartList.forEach((elem)=>{
                products.push({
                    name:elem.name,
                    price:elem.price,
                    qty:qtyState[index],
                    id:elem._id,
                    imgArr:[...elem.imgArr],
                    dimensions:[...elem.dimensions],
                    catString:computeCatString(elem)
                });
                index=index+1;
            });



            //body setup.......
            const body=JSON.stringify({
                buyerId:id_RP,
                vendorId:cartList[0].vendorId._id,
                vendorLat:cartList[0].vendorId.Lat,
                vendorLong:cartList[0].vendorId.Long,
                outletName:cartList[0].vendorId.outletName,
                vendorPh:cartList[0].vendorId.mobileOne,
                vendorName:cartList[0].vendorId.fsName+" "+cartList[0].vendorId.lsName,
                products:products,
                status:"PENDING"
            });

            console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
            console.log(cartList[0].vendorId.mobileOne);
            console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
            
          

            //try catch starts here......
            try
            {
                const res=await axios.post(API.server+"/buyer/request/issue",body,config);

                if(res)
                {
                    props.navigation.navigate("request");
                }
                else
                {
                    setAppState(2);
                    Alert.alert("Failed","Could Not Issue Request Due To Network Error");
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
            //try catch ends here........
         }
         //Issue Request ends here................








    //show product details starts here.......
    const showProductDetails=(index)=>{
        props.navigation.navigate("onlyProductDetailCart",{
            product:cartList[index]
        });
    }
    //show product details ends here.........

    //Removing Item from Cart starts here......
    const removeItem=async (index)=>{
            setAppState(1);
        //config setup....
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };


        //body setup....
        const body=JSON.stringify({
            buyerId:id_RP,
            productId:cartList[index]._id
        });


        //try catch starts here......
        try
        {
            const res=await axios.post(API.server+"/buyer/wishlist/deleteItemFromCart",body,config);

            if(res)
            {
               fetchAllCartData(); 
            }
            else
            {
                setAppState(2);
                Alert.alert("Failed","Could Not Complete Deletion Process");
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
        //try catch ends here........
    }
    //Removing Item from Cart ends here........

    
    //Increment function starts here.....
    const incQty=(index)=>{

        //Doing some computations........................
        const unitPrice=parseFloat(cartList[index].price);
        const currentQuantity=qtyState[index];
        const newQty=currentQuantity+1;
        const newSum=parseFloat((unitPrice*newQty));
        const newTotal=parseFloat(unitPrice+totalState);

        //checking weather exceeding than 100000....
        if(newTotal>100000)
        {
            Alert.alert("Bill Exceeded","You Total Items Bill Cannot Be Greater Than 100000 Rs");
        }
        else
        {
            let newQtyArr=[...qtyState];
            let newSumArr=[...sumState];

            newQtyArr[index]=newQty;
            newSumArr[index]=newSum;

            //setting back states....
            setQtyState([...newQtyArr]);
            setSumState([...newSumArr]);
            setTotalState(newTotal);
        }
    }
    //increment function ends here.......



    //Decrement function starts here....
    const decQty=(index)=>{

        if(qtyState[index]>=2)
        {
            const unitPrice=parseFloat(cartList[index].price);
            const currentQuantity=qtyState[index];
            const newQty=currentQuantity-1;
            const newSum=parseFloat((unitPrice*newQty));
            const newTotal=parseFloat(totalState-unitPrice);

            let newQtyArr=[...qtyState];
            let newSumArr=[...sumState];

            newQtyArr[index]=newQty;
            newSumArr[index]=newSum;

            //setting back states....
            setQtyState([...newQtyArr]);
            setSumState([...newSumArr]);
            setTotalState(newTotal);
            
        }
    }
    //Decrement function ends here......


    //Show vendor details starts here......
    const showVendorDetails=async (vendor)=>{
        
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


                            // console.log("Please see the region before taking Off");
                            // console.log("***************************************");
                            // console.log(elem);
                            // console.log("****************************************");

                            props.navigation.navigate("onlyVendorDetailCart",{
                                vendor:vendor,
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
    //show vendor details ends here........



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



    //Fetching all the cart data starts here......
    const fetchAllCartData=async ()=>{

        setAppState(1);
        //config starts....
        const config={
            headers:{
                'Content-Type':'application/json',
                'b-auth-humtoken':token_RP
            }
        };



        //body settings........
        const body=JSON.stringify({
            buyerId:id_RP
        });



        //try catch starts here.......
        try
        {
            const res=await axios.post(API.server+"/buyer/wishlist/getAllCart",body,config);

            if(res)
            {
                if(res.data.data.length===0)
                {
                    setAppState(3);
                    setErrorState("Your Cart Is Empty");
                    return
                }
                setCartList([...res.data.data]);

                //setting quantity, sumState starts....
                let qtyArr=[];
                let sumArr=[];
                let sum=0;
                res.data.data.forEach(element => {
                    qtyArr.push(1);
                    sumArr.push(parseFloat(element.price));
                    sum+=parseFloat(element.price);
                });
                setQtyState([...qtyArr]);
                setSumState([...sumArr]);
                setTotalState(sum);
                //setting ty ends ...........

                setAppState(2);
                
            }
            else
            {
                setAppState(3);
                setErrorState("Could Not Get Cart Info. Please try again");
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
        //try catch ends here.........
    }
    //Fetching all the cart data ends here........



    //main GUI man starts here........
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading/>
            </React.Fragment>
        );
    }
    else
    if(appState===2)
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.container}>
                    
                    {/* Top Bar starts Here... */}
                    <View style={styles.topBarView}>
                        <Icon 
                            name="store"
                            size={35}
                            color={Color.success}
                            style={styles.icon}
                            onPress={()=>{
                                showVendorDetails(cartList[0].vendorId);
                            }}
                        />

                        <View style={styles.totalView}>
                        <Text style={styles.totalText}>{"Rs: "+totalState}</Text>
                        </View>
                    </View>
                    {/* Top Bar Ends Here..... */}




                    {/* Scroll View Starts Here..... */}
                    <ScrollView style={styles.scrollView}>
                        {
                            cartList.map((elem,index)=>{
                                return (
                                    <View key={index} style={{...styles.barView,backgroundColor:handleColors()}}>
                                        <Text style={styles.itemName}>{elem.name+" ("+elem.price+") Rs"}</Text>

                                        <View style={styles.restView}>
                                            {/* Deleting button starts here... */}
                                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'baseline'}}>
                                            

                                            <TouchableOpacity onPress={()=>{removeItem(index)}} activeOpacity={0.5} style={styles.delBtn}>
                                                <Text style={styles.btnText}>x</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={()=>{showProductDetails(index)}} activeOpacity={0.5} style={styles.detailBtn}>
                                                <Icon 
                                                    name="calendar-week"
                                                    color="white"
                                                    size={20}
                                                />
                                            </TouchableOpacity>


                                            </View>
                                            {/* Deleting button ends here..... */}


                                            {/* Second View Starts Here... */}
                                            <View style={styles.secondView}>
                                            <TouchableOpacity onPress={()=>{incQty(index)}} activeOpacity={0.5} style={styles.incBtn}>
                                                <Text style={styles.btnText}>+</Text>
                                            </TouchableOpacity>
                                            <View style={styles.qtyView}>
                                                <Text style={styles.qtyText}>{qtyState[index]}</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>{decQty(index)}} activeOpacity={0.5} style={styles.decBtn}>
                                                <Text style={styles.btnText}>-</Text>
                                            </TouchableOpacity>
                                            <View style={styles.sumView}>
                                                <Text style={styles.sumText}>
                                                    {"Rs: "+sumState[index]}
                                                </Text>
                                            </View>
                                            <View style={styles.paddingView}>

                                            </View>
                                            </View>
                                            {/* Second View Ends Here.... */}
                                            
                                        </View>
                                    </View>
                                );
                            })
                        }


                        {/* Issue Request Button starts here... */}
                        <View style={styles.issueRequestView}>
                            <TouchableOpacity onPress={()=>{issueRequest()}} activeOpacity={0.5} style={styles.issueRequestBtn}>
                                <Text style={styles.issueRequestText}>Confirm Availability</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Issue request Button ends here..... */}
                    </ScrollView>
                    {/* Scroll View Ends Here....... */}
                </View>
            </React.Fragment>
        );
    }
    else
    if(appState===3)
    {
        mainGUI=(
            <React.Fragment>

                
                <View style={styles.errorView}>
                    <Text style={styles.errorText}>{errState}</Text>
                </View>
            </React.Fragment>
        );
    }
    //main GUI ends here..............

    return (
        <React.Fragment>
            <NavigationEvents 
                onDidFocus={()=>{
                    fetchAllCartData();
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


    errorView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },



    errorText:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'red'
    },

    topBarView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:3
    },


    totalView:{
        width:130,
        padding:5,
        borderWidth:2,
        borderColor:Color.success,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginRight:3
    },


    totalText:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'green'
    },


    icon:{
        marginLeft:3
    },


    scrollView:{
        width:'100%',
        marginTop:40,
        paddingLeft:20,
        paddingRight:20
    },

    barView:{
        width:'100%',
        padding:10,
        marginBottom:20
    },


    itemName:{
        fontFamily:'roboto-regular',
        color:'white'
    },


    restView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:"space-between",
        marginTop:5
    },


    secondView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:2,
        marginTop:5
    },


    incBtn:{
        backgroundColor:Color.primary,
        width:30,
        padding:2,
        marginRight:3,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },


    decBtn:{
        backgroundColor:Color.info,
        width:30,
        padding:2,
        marginRight:3,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },

    delBtn:{
        backgroundColor:"red",
        width:25,
        height:25,
        marginRight:5,
        marginTop:7,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },


    detailBtn:{
        backgroundColor:"green",
        width:25,
        height:25,
        marginTop:7,
        marginRight:3,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },

    btnText:{
        fontFamily:'roboto-regular',
        color:'white',
        fontSize:17,
        fontWeight:'bold'
    },


    qtyView:{
        backgroundColor:'white',
        paddingLeft:5,
        paddingRight:5,
        marginRight:3,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },


    qtyText:{
        color:'black',
        fontFamily:'roboto-regular'
    },


    sumView:{
        backgroundColor:'white',
        marginRight:3,
        paddingLeft:5,
        paddingRight:5,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },

    sumText:{
        fontFamily:'roboto-regular',
        color:"black"
    },


    issueRequestView:{
        width:'100%',
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center'
    },


    issueRequestBtn:{
        width:220,
        padding:10,
        backgroundColor:Color.welcomeBack,
        flexDirection:'row',
        justifyContent:'center'
    },

    issueRequestText:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'white'
    },
    paddingView:{
        marginRight:45,
        padding:5
    }
    
});

export default Cart;