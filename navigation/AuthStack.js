import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native-paper';

import FormAccidentScreen from '../screens/FormAccidentScreen';
import LoadingScreen from '../screens/LoadingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/Onboarding';
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [userType, setUserType] = useState();
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)

    /* GoogleSignin.configure({
      webClientId: 'YOUR_APP_WEB_CLIENT_ID',
    }); */

  }, []);

  if (isFirstLaunch === null) {
    return (
    //  <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
    //     <ActivityIndicator animating={true} />
    //   </View>
      <LoadingScreen />
    )
    //routeName = 'Login';

    //return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else {
    //routeName = 'Onboarding';
    routeName = 'Login';
    //return <LoadingScreen />
    //routeName = 'Onboarding';
    //return null;
  }

  return (
    <Stack.Navigator initialRouteName={routeName}
      mode={'modal'}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        
        name="Loading"
        component={LoadingScreen}
        options={{header: () => null}}
        
      />
       <Stack.Screen
        
        name="Accident"
        component={FormAccidentScreen}
        options={{header: () => null}}
        
      />
      <Stack.Screen
        
        name="Signup"
        component={SignupScreen}
        options={{header: () => null}}
        
      />
      <Stack.Screen

          name="Home"
          component={HomeScreen}
          options={{header: () => null}}

      />
    </Stack.Navigator>
  );
};
export default AuthStack;


