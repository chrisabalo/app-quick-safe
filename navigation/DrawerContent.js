import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Text,
    Share,
    ImageBackground,
    ScrollView,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import {
    Title,
    Caption,
    Paragraph,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {  MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Icons from 'react-native-vector-icons/Ionicons'
import { colors } from '../styles';
import {windowHeight} from "../utils/Dimentions";
import {LinearGradient} from "expo-linear-gradient";
import {AuthContext} from "./AuthProvider";
import {Avatar} from "react-native-elements";
import {Feather, Ionicons} from "react-native-vector-icons";
import DrawerNavigator from "@react-navigation/drawer/src/navigators/createDrawerNavigator";
import {apiUrl} from "../apiUrl";
//import{ AuthContext } from '../components/context';

export function DrawerContent(props) {

    const { user,logout, setUser } = useContext(AuthContext);

    const userID = JSON.parse(user)
    const nom = userID.data.nomuser;
    const id = userID.data.iduser;
    const prenom = userID.data.prenomuser;
    const adresse = userID.data.adresseuser;
    const [alerte, setAlertes] = useState(0);
    const [totalAlerte, setTotalAlertes] = useState(0);

    const HandleLogout = () => {

        ToastAndroid.showWithGravity(' Deconnexion en cours..', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        setTimeout(() => {

            logout();
        }, 2500)
    }
    const _COUNT_ALL_ALERTES = async () => {
        try {
            await apiUrl.get(`accidents/all-accidents`).then(resp => {
                let data = resp.data.data
                console.log(data)
                setTotalAlertes(data[0].total_accident)
                console.log('Total count ', data[0].total_accident)
            })
        }catch (e) {
            console.log(e)
        }
    }
    const _COUNT_ALERTES_USER_ID = async () => {
        try {
            await apiUrl.get(`accidents/alertes/${id}`).then(resp => {
                let datas = resp.data.data
                setAlertes(datas[0].total)
                console.log(datas[0].total)
                console.log('count ', datas[0].total)
            })
        }catch (e) {
            console.log(e)
        }
    }
    const myCustomShare = async() => {
        let urls = `https://expo.io/artifacts/35487990-a673-4349-8de9-44f5d7d9f21f`;
        try {
            await Share.share({
               title: 'QUICKSAFE',
               message: `Partage QUICK SAFE à votre entourage via ${urls}`,
               url: `${urls}`,
           })
        }catch (e) {
            console.log(e)
        }
    };
    useEffect(()=> {
        _COUNT_ALERTES_USER_ID();
        _COUNT_ALL_ALERTES();
    }, [])

    return(

        <View style={{ flex: 1}}>
            <ImageBackground source={require('../assets/img.jpg')}
                style={{width: undefined, padding: 16, paddingTop: 48}}
            >
                <Avatar
                    title={nom[0]+''+prenom[0]}
                    titleStyle={{color: colors.white, textTransform: 'uppercase',
                        fontFamily: 'Oswald-ExtraLight', fontSize: 30}}
                    containerStyle={{borderWidth: 2, borderColor: colors.white,
                        borderRadius: 50}}
                    size={80}
                ></Avatar>
                <Text style={styles.name} >{nom} {prenom}</Text>
                <View style={{ flexDirection: 'row'}}>
                       <Text style={styles.followers}>
                           {alerte === 0 ?  `${alerte} alerte emise` : alerte === 1 ? `${alerte} alerte emise` : `${alerte} alertes emises`}
                       </Text>
                    <Feather style={{ marginRight: 10}} name="alert-octagon" size={16} color="rgba(255,255,255,0.8) "/>

                       <Text style={styles.followers}>
                           {totalAlerte === 0 ?  `${totalAlerte} notification` : totalAlerte === 1 ? `${totalAlerte} notification` : `${totalAlerte} notifications`}
                       </Text>
                       <Feather name="alert-triangle" size={16} color="rgba(255,255,255,0.8) "/>
                </View>
            </ImageBackground>
            <View style={styles.drawerContent}>
                <DrawerContentScrollView  {...props} showsVerticalScrollIndicator={false}>
                    <Drawer.Section  title="Menu Principal"  style={styles.drawerSection}>
                        <DrawerItem

                            icon={({color, size}) => (
                                <Feather name="navigation" size={size} color={color} />
                            )}
                            label="Ma position "
                            labelStyle={styles.label}
                            onPress={() => {props.navigation.navigate('Home')}}

                        />
                        <DrawerItem

                            icon={({focused, color, size}) => (
                                <Icons
                                    name={focused ? 'ios-person-circle' : 'ios-person-circle-outline'}
                                    color={focused ? colors.pink : color}
                                    size={size}
                                />
                            )}

                            label="Mon compte"
                            labelStyle={styles.label}
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icons
                                    name='ios-notifications-circle-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Notifications"
                            labelStyle={styles.label}
                            onPress={() => {props.navigation.navigate('Notifications')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icons
                                    name='ios-information-circle-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Support"
                            labelStyle={styles.label}
                            onPress={() => {props.navigation.navigate('Apropos')}}
                        />
                    </Drawer.Section>
                      <Drawer.Section title="Preferences">
                          <DrawerItem
                              icon={({color, size}) => (
                                  <Icons
                                      name='ios-share-social-outline'
                                      color={color}
                                      size={size}
                                  />
                              )}
                              label="Partager sur"
                              labelStyle={styles.label}
                              onPress={() => myCustomShare()}
                          />
                      </Drawer.Section>
                      <Drawer.Section style={styles.bottomDrawerSection}>
                          <DrawerItem
                              icon={({color, size}) => (
                                  <Icons
                                      name='ios-exit-outline'
                                      color={color}
                                      size={size}
                                  />
                              )}
                              label="Se deconnecter"
                              labelStyle={styles.label}
                              onPress={() => HandleLogout()}
                          />
                      </Drawer.Section>

                </DrawerContentScrollView>

            </View>
            <View style={{ alignItems: 'center', justifyContent: "flex-end"}}>
                <Text style={{ textTransform: "uppercase", color: colors.grey, lineHeight: 65, fontSize: 10, fontFamily: "Oswald-Bold" }} >credit &copy; 2021 v1.0.1</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    name: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 5,
        fontFamily: 'Oswald-ExtraLight'
    },
    followers: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
        marginRight: 4,
        fontFamily: 'Oswald-Light',
        textTransform: "uppercase"
    },
    userInfoSection: {
      paddingLeft: 20,

    },
    title: {
      fontSize: 16,
      marginTop: 3,
        fontFamily: 'Oswald-Bold'
    },
    label: {
        fontFamily: 'Oswald-ExtraLight',
        fontSize: 16
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
        fontFamily: 'Oswald-ExtraLight',
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
        fontFamily: 'Oswald-ExtraLight'
    },
    drawerSection: {
      marginTop: -20,
    },
    bottomDrawerSection: {
        marginBottom: 5,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        fontFamily: 'Oswald-ExtraLight'
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
        fontFamily: 'Oswald-Bold'
    },
  });