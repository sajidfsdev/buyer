import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../Constants/Colors';

import SignUpScreen from '../Screens/SignUp';
import SignInScreen from '../Screens/SignIn';

const signInTab=createBottomTabNavigator({
    signin:{
        screen:SignInScreen,
        navigationOptions:{
            tabBarLabel:'SIGNIN',
            tabBarIcon:({tintColor})=>{
                return <Icon name="sign-in" size={30} color={tintColor} />
            }
        }
    },
    signup:{
        screen:SignUpScreen,
        navigationOptions:{
            tabBarLabel:'SIGNUP',
            tabBarIcon:({tintColor})=>{
                return <Ionicons name="md-person-add" size={30} color={tintColor}  />
            }
        }
    }
},
{
    tabBarOptions:{
        activeTintColor:Color.welcomeBack
    }
});

export default createAppContainer(signInTab);