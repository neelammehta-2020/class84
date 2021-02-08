import React, { Component } from 'react';
import {View , Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack'
import BookDonateScreen from './screens/BookDonateScreen';
import RecieverDetailsScreen from './screens/RecieverDetailsScreen'

export const AppStackNavigator =createStackNavigator({
    BookDonateScreen:{
        screen:BookDonateScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    RecieverDetails:{
        screen:RecieverDetailsScreen,
        navigationOptions:{
            headerShown:false
        }
    }
},
{
    initialRouteName:'BookDonteList'
}
)