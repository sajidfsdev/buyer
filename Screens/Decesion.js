import React from 'react';
import { View,Text,Button,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import Color from '../Constants/Colors';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../Reusable/HeaderBtn';

const Decesion=(props)=>{

    //const use selector starts here...
    const cat_RP=useSelector(state=>state.cat.cat);
    const subCat_RP=useSelector(state=>state.cat.subCat);
    const subSubCat_RP=useSelector(state=>state.cat.subSubCat);
    //const use selector ends here.....


    //custom methods starts here...
    const handleCatSearching=()=>{

        props.navigation.navigate('catsearchview');
    }//.............................


    const handleProductSearching=()=>{

        let navString="";
        //constructing string nav....
        if(subCat_RP==="not available")
        {
            navString=cat_RP;
        }
        else if(subSubCat_RP==="not available")
        {
            navString=cat_RP+"-->"+subCat_RP;
        }
        else
        {
            navString=cat_RP+"-->"+subCat_RP+"-->"+subSubCat_RP;
        }

        props.navigation.navigate('prodsearchview',{navString:navString});
    }//.............................
    //custom method ends here......

    //return starts here...
    return (
        <View style={styles.container}>
            
            <View style={styles.textView}>
                <Text style={styles.text}>Choose Your Search Preference</Text>
            </View>

            <View style={styles.btnView}>
            
                    <Button onPress={handleCatSearching} color={Color.success} style={styles.btn} title="Continue Category Search" />
                
            </View>

            <View style={styles.textView}>
                <Text style={styles.text}>OR</Text>
            </View>

            <View style={styles.btnView}>
                
                    <Button onPress={handleProductSearching} color={Color.primary}  style={styles.btn} title="Product Specific Search" />
                
            </View>
            
        </View>
    );
    //return ends here.....

}//.......................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },


    textView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:20
    },

    text:{
        fontFamily:'roboto-regular',
        fontSize:18
    },


    btnView:{

        width:'80%',
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:20
    },

    btn:{
        flex:1,
        fontFamily:'roboto-regular',
        fontSize:15,
        padding:3
    }
});


Decesion.navigationOptions=(navigationData)=>{
    return {
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderBtn} >
                <Item 
                    title="home" iconName="home" onPress={()=>{
                        navigationData.navigation.navigate("cat");
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default Decesion;