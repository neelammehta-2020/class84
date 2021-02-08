
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppTabNavigator} from './components/AppTabNavigator';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import {AppDrawerNavigator} from './components/AppDrawerNavigator'
import RecieverDetailsScreen from './screens/RecieverDetailsScreen';

export default function App() {
  return (
   <AppConatiner/>
  );
}
const switchNavigator =createSwitchNavigator({
  WelcomeScreen:{
    screen:WelcomeScreen
  },
  RecieverDetails:{
    screen:RecieverDetailsScreen
  },
  Drawer:{screen:AppDrawerNavigator},
  
})

const AppConatiner=createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
