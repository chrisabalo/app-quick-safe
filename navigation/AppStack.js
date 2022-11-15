import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Plus...
import plus from '../assets/plus.png'

// Font Awesome Icons...
import { FontAwesome5 } from '@expo/vector-icons'
import HomeScreen from "../screens/HomeScreen";
import {colors, getWidth} from "../styles";
import AproposScreen from "../screens/AproposScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Fontisto} from "react-native-vector-icons";
import FormAccidentScreen from "../screens/FormAccidentScreen";
import {createStackNavigator, HeaderStyleInterpolators} from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NotifStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: colors.pink,
                    elevation: 0,
                    shadowOpacity: 0
                },
                headerTintColor: colors.white,
                headerTitleStyle :{
                    fontWeight: 'bold',
                    fontFamily: 'Oswald-Medium'
                },
            }}
        >
            <Stack.Screen name="Notifications" component={NotificationScreen} />
        </Stack.Navigator>
    )
}


// Hiding Tab Names...
export default function MainTabsScreen() {
    // Animated Tab Indicator...
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return (
        <>
            <Tab.Navigator tabBarOptions={{
                showLabel: false,
                // Floating Tab Bar...
                style: {
                    backgroundColor: colors.darkBg,
                    position: 'absolute',
                    bottom: 10,
                    marginHorizontal: 20,
                    // Max Height...
                    height: 60,
                    borderRadius: 10,
                    // Shadow...
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    },
                    paddingHorizontal: 20,
                }
            }}>

                {
                    // Tab Screens....

                    // Tab ICons....
                }
                <Tab.Screen name={"Home"} component={HomeScreen} options={{
                   tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <AntDesign
                                name="home"
                                size={24}
                                color={focused ? colors.pink : 'gray'}
                            ></AntDesign>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: 0,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Notifications"} component={NotificationScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>

                            <AntDesign
                                name="bells"
                                size={24}
                                color={focused ? colors.pink : 'gray'}
                            ></AntDesign>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth(),
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>


                {

                    // Extra Tab Screen For Action Button..
                }

                <Tab.Screen name={"Accident"} component={FormAccidentScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <FormAccidentScreen />
                    )
                }}></Tab.Screen>

                <Tab.Screen name={"Profile"} component={ProfileScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <AntDesign
                                name="user"
                                size={24}
                                color={focused ? colors.pink : 'gray'}
                            ></AntDesign>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 3,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Apropos"} component={AproposScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <AntDesign
                                name="API"
                                size={24}
                                color={focused ? colors.pink : 'gray'}
                            ></AntDesign>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 4,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

            </Tab.Navigator>

            <Animated.View style={{
                width: getWidth() - 20,
                height: 2,
                backgroundColor: colors.pink,
                position: 'absolute',
                bottom: 70,
                // Horizontal Padding = 20...
                left: 50,
                borderRadius: 20,
                transform: [
                    { translateX: tabOffsetValue }
                ]
            }}>

            </Animated.View>
        </>
    );
}


function EmptyScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});