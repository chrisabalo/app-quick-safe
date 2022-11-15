import 'react-native-gesture-handler';
import React from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Providers from './navigation';
import LoadingScreen from "./screens/LoadingScreen";
import {ActivityIndicator} from "react-native";
import {colors} from "./styles";
import {StatusBar} from "expo-status-bar";
import 'moment/locale/fr-ca';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount() {
      await Font.loadAsync({
        'Teko-Bold': require('./assets/fonts/Teko-Bold.ttf'),
        'Teko-Light': require('./assets/fonts/Teko-Light.ttf'),
        'Teko-Medium': require('./assets/fonts/Teko-Medium.ttf'),
        'Teko-Regular': require('./assets/fonts/Teko-Regular.ttf'),
        'Teko-SemiBold': require('./assets/fonts/Teko-SemiBold.ttf'),
        'Kufam-SemiBoldItalic': require('./assets/fonts/Kufam-SemiBoldItalic.ttf'),
        'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
        'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
        'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
        'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
        'Oswald-Bold': require('./assets/fonts/static/Oswald-Bold.ttf'),
        'Oswald-ExtraLight': require('./assets/fonts/static/Oswald-ExtraLight.ttf'),
        'Oswald-Light': require('./assets/fonts/static/Oswald-Light.ttf'),
        'Oswald-Medium': require('./assets/fonts/static/Oswald-Medium.ttf'),
        'Oswald-Regular': require('./assets/fonts/static/Oswald-Regular.ttf'),
        'Oswald-SemiBold': require('./assets/fonts/static/Oswald-SemiBold.ttf'),
        ...Ionicons.font
      })
      this.setState({ fontLoaded: true})

      console.log('Fonts are loaded')


  }
      componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
          return;
        };
      }
 

  render() {

    if (this.state.fontLoaded) {
      console.log('font loaded', this.state.fontLoaded)
      return (
          <>
            <Providers />
            <StatusBar style={"light"} />
          </>
      );
    }
   /* return <ActivityIndicator
        style={{ flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.dark}}
          color={colors.pink}
          size={50} />;*/
    return <LoadingScreen />

  }
}
