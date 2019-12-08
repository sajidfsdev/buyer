import React,{ useState,useEffect } from 'react';
import { Text,View,StyleSheet,FlatList,TouchableOpacity,Alert } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import image from '../assets/one.jpg';
import Color from '../Constants/Colors';
import { useSelector } from 'react-redux';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../Reusable/HeaderBtn';

const ShopSubSubCat=(props)=>{

    const products_RP=useSelector(state=>state.shop.products);

    //Array ............
    let colorArr=[
        
        "#a61ea6",
        "#a61e40",
        "#a39c1c",
        "#ba690d",
        "#052c5c",
        "#22b536",
        "#1ea68b"
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
    const moveToNext=(subSubCat)=>{

        props.navigation.navigate("shopProductList",{
            vendorId:products_RP[0].vendorId,
            outletName:props.navigation.getParam("outletName"),
            cat:props.navigation.getParam("cat"),
            subCat:props.navigation.getParam("subCat"),
            subSubCat:subSubCat
        });
    }
    //Handle Move To Next Ends Here.........





    //return statement starts here.....
    return (
        <React.Fragment>


            {/* Top Navigation starts here.... */}
            <View style={styles.navView}>
                    <Text style={styles.navText}>
                        {props.navigation.getParam('headerText')}
                    </Text>
               </View>
               {/* Top Navigation Ends Here...... */}



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
                            Sub-Sub-Categories
                        </Text>
                    </View>
                    </View>




                    {/* Flat list starts here... */}
                    <FlatList
                        style={styles.FlatList}
                        data={props.navigation.getParam("subSubCat")}
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
    },



    navView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        backgroundColor:Color.welcomeBack,
        padding:1
    },


    navText:{
        fontFamily:'roboto-regular',
        fontSize:12,
        color:'white',
        marginLeft:2
    }


    
});


ShopSubSubCat.navigationOptions=(navigationData)=>{
    const outletName=navigationData.navigation.getParam("outletName");
    return {
        headerTitle:outletName,
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
            <Item
                title="home"
                iconName="home"
                onPress={()=>{
                    navigationData.navigation.navigate('cat');
                }}
            />
            
        </HeaderButtons>
        )
    }
}

export default ShopSubSubCat;