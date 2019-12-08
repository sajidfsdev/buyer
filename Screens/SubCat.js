import React,{ useState,useEffect } from 'react';
import { View,Text,StyleSheet,Alert,TextInput,FlatList,TouchableOpacity } from 'react-native';

import { useSelector,useDispatch } from 'react-redux';
import Fuse from 'fuse.js';
import * as Types from '../Store/Types/cat';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../Reusable/HeaderBtn';

const SubCat=(props)=>{

    //redux state starts here....
    const cats_RP=useSelector(state=>state.cat.cats);
    const cat_RP=useSelector(state=>state.cat.cat);
    const dispatch=useDispatch();
    //redux state ends here......

    //state management starst here...
    const [searchState,setSearchState]=useState('');
    const [subCatState,setSubCatState]=useState([]);
    //state managament ends here.....


    //use effect starts here......
    useEffect(()=>{

        let subArr=cats_RP.subCat.filter(elem=>{
            if(elem.cat===cat_RP)
            {
                return true;
            }
        });

        let subArrTitles=[];
        subArr.forEach(elem=>{
            subArrTitles.push(elem.title);
        });


        //setting state
        setSubCatState([...subArrTitles]);



    },[]);
    //use effect ends here........


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


    //Handle Next starts here....
    const handleNext=(subCat)=>{
        
        //checking for sub sub cat ....
        let subsubarr=cats_RP.subSubCat.filter(elem=>{
            if(elem.cat===cat_RP && elem.subCat===subCat)
            {
                return true;
            }
        });
        //checking for sub sub cat ends here...


        if(subsubarr.length===0)
        {
            dispatch({type:Types.SETSUBCAT,payload:{subCat:subCat}});
            dispatch({type:Types.SETSUBSUBCAT,payload:{subSubCat:"not available"}});
            props.navigation.navigate('decesion');
        }
        else
        {
            dispatch({type:Types.SETSUBCAT,payload:{subCat:subCat}});
            props.navigation.navigate('subSubCat');
        }
    }
    //Handle Next Ends Here......


    const handleSearchInput=(search)=>{

        setSearchState(search);

        var options = {
        keys: ['title'],
        id: 'title',
        weight: 0.7
    }
   var fuse = new Fuse(cats_RP.subCat.filter(elem=>elem.cat===cat_RP), options)
  
   const res=fuse.search(search);

   if(res.length===0)
   {
       let arr=[];
       cats_RP.subCat.filter(e=>e.cat===cat_RP).forEach(elem=>{
           arr.push(elem.title);
       });
        setSubCatState(arr);
   }
   else
   {
       setSubCatState(res);
   }

    }//............................



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

    //return statement starts here...
    return (
        <View style={styles.container}>
            
           <View style={styles.searchView}>
                <TextInput onChangeText={handleSearchInput} value={searchState} style={styles.search} placeholder="Search Categories" />
           </View>

           <FlatList style={styles.flatList} data={subCatState} numColumns={3} 
            keyExtractor={(item,index)=>item}
            renderItem={
                (itemData)=>{
                    return (
                        <View style={styles.box}>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>{handleNext(itemData.item)}}>
                                <View style={{...styles.subBox,backgroundColor:handleColors()}}>
                                    <Text style={styles.title}>{itemData.item[0]}</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                width:70,
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center',
                                padding:1
                                
                            }}>
                                <Text style={styles.itemName}>{itemData.item}</Text>
                            </View>
                            
                            
                        </View>
                    );
                }
            } />

        </View>
    );
    //return statement ends here.....

}//.....................

const styles=StyleSheet.create({
    container:{
        flex:1
    },

    searchView:{
        marginTop:20,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    },

    search:{
        borderWidth:1,
        width:'90%',
        padding:10,
        borderRadius:7,
        fontSize:15
    },

    box:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },

    subBox:{
        width:70,
        borderWidth:1,
        height:70,
        borderRadius:35,
        justifyContent:'center',
        alignItems:'center'
    },

    flatList:{
        marginTop:30,
        marginLeft:20,
        marginRight:20
    },

    title:{
        color:'white',
        fontFamily:'roboto-regular',
        fontSize:25
    },

    itemName:{
        fontFamily:'roboto-regular',
        fontSize:12
    }

});


SubCat.navigationOptions=(navigationData)=>{
    return {
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderBtn} >
                <Item 
                    title="home" iconName="home" onPress={()=>{
                        navigationData.navigation.navigate("cat");
                    }}
                />
                <Item title="Home" iconName="bars" onPress={()=>{
                    navigationData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}

export default SubCat;