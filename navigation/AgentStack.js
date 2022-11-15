import React from 'react';
import {View, TouchableOpacity, Text, ToastAndroid} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
//import {Ionicons} from 'react-native-vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons, Entypo, EvilIcons, FontAwesome, MaterialIcons, Feather, AntDesign} from '@expo/vector-icons'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MapScreen from '../screens/Agent/MapScreen'
import ListScreen from '../screens/Agent/ListScreen'
import PharmaScreen from '../screens/Agent/PharmaScreen'

const Tab = createMaterialBottomTabNavigator();

const AgentStack = () => {

  return (
    <Tab.Navigator
      initialRouteName="MapData"
      activeColor="#ffffff"
      inactiveColor="#ffffff" 
    >
    <Tab.Screen
      name="MapData"
      component={MapScreen}
      options={{
        tabBarLabel: '',
        tabBarColor: '#8022D9',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="ListMap"
      component={ListScreen}
      options={{
        tabBarLabel: '',
        tabBarColor: '#8022D9',
        tabBarIcon: ({ color }) => (
          <AntDesign name="bars" size={26} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Pharmacie"
      component={PharmaScreen}
      options={{
        tabBarLabel: '',
        tabBarColor: '#8022D9',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="ambulance" color={color} size={26} />
        ),
      }}
    />
    
  </Tab.Navigator>
  );
}

export default AgentStack;