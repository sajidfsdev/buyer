import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//constants import ....
import Color from '../Constants/Colors';
import TestScreen from '../Testing/test';



//////////////////////////////////////////////////////
//////////Request stack starts here
//////////////////////////////////////////////////////

const TestingStack=createStackNavigator({
    test:{
        screen:TestScreen,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle:"Testing",
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            },

            headerStyle:{
                backgroundColor:Color.welcomeBack
            }

        }
    }
});






export default createAppContainer(TestingStack);