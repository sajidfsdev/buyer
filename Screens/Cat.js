import React,{ useEffect,useState } from 'react';
import { View,Text,StyleSheet,TextInput,Image,FlatList,Alert ,TouchableOpacity} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import * as Actions from '../Store/Actions/Cat';
import * as Types from '../Store/Types/cat';
import Fuse from 'fuse.js';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtnComp from '../Reusable/HeaderBtn';


// var options = {
//     keys: ['title', 'author'],
//     id: 'ISBN'
//   }
//   var fuse = new Fuse(books, options)
  
//   fuse.search('old')

const Cat=(props)=>{

    //state management starts here....
    const [searchState,setSearchState]=useState('');
    const [catState,setCatState]=useState([]);
    const [loadNum,setLoadNum]=useState(0);
    //state managem ent ends here......

    //Redux MAT starts here....
    const token_RP=useSelector(state=>state.auth.token);
    const cats_RP=useSelector(state=>state.cat.cats);
    const catsloaded_RP=useSelector(state=>state.cat.loaded);
    const error_RP=useSelector(state=>state.cat.error);
    const errorMessage_RP=useSelector(state=>state.cat.errorMessage);
    const dispatch=useDispatch();
    //Redux MAT ends here......


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


    //use effect starts here....
    useEffect(()=>{
        //disptching cat action....
        dispatch(Actions.handleFetchAllCats(token_RP));
    },[]);
    //use effect end shere......


    if(catsloaded_RP===true && loadNum===0)
    {
        let arr=[];
        cats_RP.cat.forEach(elem=>{
            arr.push(elem.title);
        });

        setCatState(arr);
        setLoadNum(1);
    }


    //Handle next starts here........
    const handleNext=(cat)=>{
        
        let subCatArr=cats_RP.subCat.filter(elem=>elem.cat===cat?true:false);

        if(subCatArr.length===0)
        {
            dispatch({type:Types.SETCAT,payload:{cat:cat}});
            dispatch({type:Types.SETSUBCAT,payload:{subCat:"not available"}});
            dispatch({type:Types.SETSUBSUBCAT,payload:{subSubCat:"not available"}});
            props.navigation.navigate('decesion');
        }
        else
        {
            dispatch({type:Types.SETCAT,payload:{cat:cat}});
            props.navigation.navigate("subCat");
        }
    }
    //Handle Next ends here..........


    const handleSearchInput=(search)=>{

        setSearchState(search);

        var options = {
        keys: ['title'],
        id: 'title',
        weight: 0.7
    }
   var fuse = new Fuse(cats_RP.cat, options)
  
   const res=fuse.search(search);

   if(res.length===0)
   {
       let arr=[];
       cats_RP.cat.forEach(elem=>{
           arr.push(elem.title);
       });
        setCatState(arr);
   }
   else
   {
       setCatState(res);
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


    //Main GUI manipulation starts here....
    let mainGUI=null;

    if(catsloaded_RP===false)
    {
        mainGUI=(
            <View style={styles.bufferingView}>
                <Image style={styles.buffering} source={require('../assets/images/spinner.gif')} />
            </View>
        );
    }
    else if(error_RP===true)
    {
        mainGUI=(
            <View style={styles.errorView}>
                <Text style={styles.error}>
                    {errorMessage_RP}
                </Text>
            </View>
        );
    }
    else
    {
        mainGUI=(
            <FlatList style={styles.flatList} data={catState} numColumns={3} 
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
        );
    }
    //Main GUI manipulation ends here......

    //return starts here....
    return (
        <View style={styles.container}>
            
           <View style={styles.searchView}>
                <TextInput onChangeText={handleSearchInput} value={searchState} style={styles.search} placeholder="Search Categories" />
           </View>

           {mainGUI}

        </View>
    );
    //return ends here......

}
//...................

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

    bufferingView:{
        width:'100%',
        height:300,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },


    buffering:{
        width:150,
        height:150
    },


    errorView:{
        width:'100%',
        height:300,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },


    error:{
        color:'red',
        fontSize:18,
        fontFamily:'roboto-regular'
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


//setting nav setting starts here.........
Cat.navigationOptions=(navigationData)=>{
    return {
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderBtnComp}>
                <Item title="Home" iconName="bars" onPress={()=>{
                    navigationData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}
//setting nav setting ends here...........

export default Cat;