import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

const TripTwo=(props)=>{

    //return statement starts here.....
    return (
        <React.Fragment>
            <View style={styles.container}>
                <Text>TRIP TWO DETECTED</Text>
            </View>
        </React.Fragment>

    );
    //return statement ends here.......

}//.....................

const styles=StyleSheet.create({
    container:{
        flex:1
    }
});

export default TripTwo;