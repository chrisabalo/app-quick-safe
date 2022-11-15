import React, { useContext, useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { StatusBar } from 'expo-status-bar';
import MainTabsScreen from './AppStack';
import AuthStack from './AuthStack'
import { DrawerContent } from './DrawerContent';
import LoadingScreen from "../screens/LoadingScreen";
import OnboardingScreen from "../screens/Onboarding";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ActivityIndicator} from "react-native";
import AgentStack from "./AgentStack";
import {colors, getWidhtDrawer} from "../styles";
import {AuthContext} from "./AuthProvider";

const Drawer = createDrawerNavigator();


const Routes = () => {

    const {user, setUser} = useContext(AuthContext)
    const [initializing, setInitializing] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

   /* const getToken = async () => {
        try {
            let userData = await AsyncStorage.getItem("userData");
            let data = userData;
            setUser(userData)
            console.log("Token: "+data);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }*/

    useEffect(() => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            try {
                let userData = await AsyncStorage.getItem("userData");
                let data = userData;
                setUser(userData)
                console.log("Token: "+data);
            } catch (error) {
                console.log("Something went wrong", error);
            }
        }, 2500)
        //console.log("After useEff: "+JSON.stringify(user))
    }, []);

    if (initializing) return null;

    if (loading) return <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.dark }} color={colors.pink}
        size='large' animating={true}
    />;

    return <NavigationContainer>
          {/*{!user ? (
              <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                  <Drawer.Screen name='HomeDrawer' component={MainTabsScreen}/>
              </Drawer.Navigator>
          ) : (<AuthStack/>)
          }
*/}
        { user ? (<Drawer.Navigator
                drawerStyle={{ width: getWidhtDrawer()}}
                drawerContent={props => <DrawerContent {...props} />}
               // hideStatusBar={Platform.OS === 'android' ? false : true}
                hideStatusBar={true}
                statusBarAnimation="slide"
                drawerContentOptions={{
                    activeBackgroundColor: "red",  //"rgba(212,118,207,0.2)"
                    activeTintColor: colors.pink,
                    labelStyle: {
                        fontFamily: 'Oswald-Medium'
                    },
                    contentContainerStyle: {
                        marginTop: 16,
                        marginHorizontal: 8
                    },
                    itemStyle: {
                        borderRadius: 4
                    }
                }}
            >
                    <Drawer.Screen  name='HomeDrawer' component={MainTabsScreen}/>
                </Drawer.Navigator>)
            : (<AuthStack />)
            }
    </NavigationContainer>;

};

export default Routes;