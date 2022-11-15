import React, {useContext, useState} from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    ActivityIndicator
} from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { windowHeight } from '../utils/Dimentions'
import { colors } from '../styles';
import {AuthContext} from "../navigation/AuthProvider";
import {StatusBar} from "expo-status-bar";
const  LoginScreen = ({navigation}) => {

    const { logout, login, user, setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandle = async (username, password) => {
        if (!username && !password) {
            ToastAndroid.showWithGravity('Vérifiez les champs svp...', ToastAndroid.LONG, ToastAndroid.TOP)
        } else {
            ToastAndroid.showWithGravity(' Connexion en cours..', ToastAndroid.LONG, ToastAndroid.BOTTOM)
            setTimeout(() => {
                login(username, password)
            }, 2500)
        }

    }


  return (
      <View style={styles.container}>
          <StatusBar hidden={true}  />
        <View style={styles.RigthCircle} />
        <View style={styles.leftCircle} />
         <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: windowHeight / 2 , marginTop: 10}}>
            <Text style={styles.titleLgoin}>Quick Safe</Text>
            <Text style={styles.subTitle}>Connectez-vous à votre compte</Text>
          </View>
            <View style={{ marginHorizontal: 20, marginVertical: -30 }}>
                <TextInput keyboardType='email-address' 
                  style={styles.input} 
                  placeholder='Votre email'
                  autoCapitalize='none'
                  placeholderTextColor={colors.pink}
                  autoCorrect={false}
                   onChangeText={text => setUsername(text.toLowerCase())}
                />
                <TextInput 
                    secureTextEntry={true}
                    style={styles.input}
                    placeholderTextColor={colors.pink}
                    placeholder='Votre Mot de passe'
                    onChangeText={text => setPassword(text)}
                />
                
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={styles.continue} onPress={() => loginHandle(username, password)}>
                <Ionicons name="md-arrow-forward" size={24} color={colors.white} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
                <Text style={styles.txtAccount}>Pas de compte ? <Text style={{ color: colors.orange}}> Inscrivez-vous</Text></Text>
                </TouchableOpacity>
            </View>
         </ScrollView>
      </View>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.dark
      },
      header: {
        fontWeight: '800',
        fontSize: 30,
        color: colors.darkBg,
        marginTop: 32,
          fontFamily: 'Oswald-ExtraLight'
      },
      input: {
        marginTop: 32,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.pink,
        borderRadius: 30,
        paddingHorizontal: 16,
        color:colors.white,
        fontWeight: '600',
        padding: 10,
          fontFamily: 'Oswald-ExtraLight'
      },
      continue: {
        height: 60,
        width: 60,
        marginTop: 30,
        borderRadius: 60 / 2,
        borderBottomEndRadius: 80,
        backgroundColor: colors.pink,
        alignItems: 'center',
        justifyContent: 'center',
       
      },
      txtAccount: {
        color: colors.white,
        marginTop: 10,
          fontFamily: 'Oswald-Light'
      },
      RigthCircle: {
        backgroundColor: colors.pink,
        position: 'absolute',
        width:  200,
        height: 210,
        borderRadius: 200,
        left:10,
        top: -40,
        
      },
      leftCircle: {
        backgroundColor: colors.orange,
        position: 'absolute',
        width:  200,
        height: 200,
        borderRadius: 100,
        left: -55,
        top: -60,
      },
      titleLgoin: {
        textTransform: 'uppercase',
        marginTop: 150,
        marginLeft: 25,
        color: colors.white,
        fontSize: 45,
        letterSpacing: -5,
        fontFamily: 'Oswald-ExtraLight'
      },
      subTitle: {
        color: colors.white,
        marginLeft: 32,
        opacity: .4,
          fontFamily: 'Oswald-ExtraLight'
      }
})