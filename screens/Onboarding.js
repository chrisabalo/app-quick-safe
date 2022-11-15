import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import slides from '../slides';
import { windowHeight } from '../utils/Dimentions';
import {colors} from "../styles";
import {LinearGradient} from "expo-linear-gradient";


const OnboardingScreen = ({navigation}) => {


  const  _renderItem = ({ item }) => {
    return (
      <LinearGradient colors={[colors.white, colors.white]}  style={{ flex: 1, backgroundColor: colors.white}}>
        <Image source={item.image} 
          style={{
              resizeMode: "cover",
              height: windowHeight / 1.6,
              width: '100%'
          }}
        />
           <Text style={styles.title}> {item.title} </Text>
           <Text style={styles.description}> {item.description} </Text>
      </LinearGradient>
    );
  }
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          onPress={()=> navigation.navigate('Login')}
        />
      </View>
    );
  };

  return(
      <AppIntroSlider 
        renderItem={_renderItem}
        data={slides}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        activeDotStyle={{
          backgroundColor: "#21465b",
          width: 30,
        }}
      />
  );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 5,
  },
  title: {
     paddingTop: 25,
     paddingBottom: 10,
     fontSize: 23,
     fontWeight: "bold",
     color: "#21465b",
     alignSelf: "center",
     textTransform: "uppercase",
      fontFamily: "Oswald-Light"
  },
  description: {
    textAlign: "center",
    color: colors.textSec,
    fontSize: 15,
    paddingHorizontal: 30,
      fontFamily: "Oswald-ExtraLight"
  }
});