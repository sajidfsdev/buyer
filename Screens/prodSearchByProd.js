import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../Reusable/HeaderBtn';

const ProdSearchByProd=(props)=>{


    //return statement starts here...
    return (
        <View style={styles.container}>
            <Text>Prod Search By Prod Under Construction</Text>
        </View>
    );
    //return stataement ends here....

}//..............................


const styles=StyleSheet.create({
    container:{
        flex:1
    }
});

ProdSearchByProd.navigationOptions=(navigationData)=>{
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

export default ProdSearchByProd;