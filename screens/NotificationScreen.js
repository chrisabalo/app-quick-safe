import React, {Component, useContext, useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    FlatList,
    StatusBar,
    Image, ScrollView, TouchableOpacity,
} from 'react-native';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import {colors, gs} from "../styles";
import {AuthContext} from "../navigation/AuthProvider";
import {apiUrl} from "../apiUrl";
import {windowWidth} from "../utils/Dimentions";
import {Notifier, NotifierComponents} from "react-native-notifier";
import {Avatar} from "react-native-elements";
import {LinearGradient} from "expo-linear-gradient";
import moment from "moment";

const NotificationScreen = ({navigation}) => {
    // Avoir  id user connecté
    const { user,logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [accident, setAccident] = useState([]);
    const userID = JSON.parse(user)
    const id_accident = userID.data.iduser;
    const nom = userID.data.nomuser;
    const prenom = userID.data.prenomuser;
    const data_receipt = userID.data.dateaccident;

    // get notifications user by user ID
    const ACCIDENT_BY_USER_ID = async () => {
           try {
               await apiUrl.get('accidents/iduser/'+id_accident).then(res => {
                   const data = res.data.data;
                 //console.log("All accident : "+ data)
                   setAccident(data)

               }).catch(e => {
                   console.log(e)
               })
           }catch (e) {
               console.log(e)
           }
    }


    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 3000)
        ACCIDENT_BY_USER_ID();
    }, [])

    console.log("Data accident : "+ JSON.stringify(accident))

    const NotificationCard = ({item}) => {
        return (
           <View style={styles.cartCard}>
                <Image source={require('../assets/icon-alerte.png')} style={{height: 20, width: 20,
                    position: 'absolute', top: 0, }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,

                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Oswald-Medium'}}>Gravité de l'accident</Text>

                    <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Oswald-Medium'}}>Nombres d'engins</Text>
                    <Text style={{fontSize: 10, color: colors.dark, fontFamily: 'Oswald-Medium'}}>
                        {item.lataccident && (`Lat: ${item.lataccident} Long : ${item.longaccident}`)}
                    </Text>
                    <Text style={{fontSize: 10, color: colors.dark, fontFamily: 'Oswald-Medium'}}>
                        {item.dateaccident && (`Date de l'accident: ${moment(`${item.dateaccident}`).format('LLLL')} `)}
                    </Text>
                </View>
                <View style={{marginRight: 20, alignItems: 'center', marginTop: -20}}>
                   <View>
                       <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.graviteaccident}</Text>
                   </View>
                    <View style={[styles.actionBtn]}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, alignItems: 'center', justifyContent: 'center'}}>{item.nombredengins}</Text>
                    </View>
                </View>
            </View>

        );
    };
    return (
        <View style={styles.container}>
            <LinearGradient colors={[colors.pink, colors.orangeLg]} start={[0, 0]} end={[1, 1]} >
                <View style={{ marginHorizontal: 21, paddingVertical: 20 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10}}>
                        <Text style={[gs.subTitle, { fontFamily: 'Oswald-ExtraLight'}]}>MES NOTIFICATIONS</Text>
                    </View>
                </View>
            </LinearGradient>
            {
                !((loading) && <ActivityIndicator style={{flex: 1}} size="large" />) ? (

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: .5}}>
                        <ActivityIndicator style={{flex: 1}} animating={true} size="large" color={colors.pink} />
                    </View>) : accident.length <= 0 ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: .5}}>
                        <Ionicons name="ios-notifications-off-circle-outline" size={200} color="black"/>
                        <Text style={{fontFamily: 'Oswald-ExtraLight', fontSize: 30}}>Pas donnée !</Text>
                    </View>) : (

                    <FlatList

                        indicatorStyle="white"
                        refreshing={true}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 80}}
                        data={accident}
                        keyExtractor={(item, index) => 'key'+index}
                        renderItem={({item}) => <NotificationCard item={item} />}
                        ListFooterComponent style={{paddingHorizontal: 20, marginTop: 20}}
                        ListFooterComponent={() => (
                            <View>
                                {/* <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: 15,
                                }}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                                    Total Price
                              </Text>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>$50</Text>
                            </View>*/}

                            </View>
                        )}
                    />
                )
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBg,
    },
    safe_area_view: {
      flex: 1,
      paddingTop: 'android' === Platform.OS ? 35 : 0,
      backgroundColor: colors.white
    },
    headerQ: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
        marginTop: 20,
        padding: 10
    },
    fake_icon_box: {
        backgroundColor: '#e4e6eb',
        width: 30,
        height: 30,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scroll_view: {
      flex: 1
    },
    fake_post: {
      height: 250,
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 8
    },
    header: {
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
    },
    cartCard: {
        height: 100,
        width: windowWidth - 40,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: colors.textSec,
        marginVertical: 10,
        marginHorizontal: 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 30,
        height: 30,
        borderBottomEndRadius: 20,
        backgroundColor: colors.pink,
        borderRadius: 50,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    imageContainer: {
        ...gs.center,
        marginTop: 10,
        shadowColor: colors.darkBg,
        shadowOffset:  { height: 3, width: 1},
        shadowOpacity: 0.5,
    },
    check: {
        ...gs.center,
        backgroundColor: colors.text,
        borderRadius: 100,
        width: 32,
        height: 32,
        shadowColor: colors.darkBg,
        shadowOffset: { height: 3, width: 1},
        shadowOpacity: 0.3,
        position: 'absolute',
        zIndex: 1,
        right: -10,
        bottom: 10

    },
    follow: {
        ...gs.button,
        ...gs.rowCenter,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginTop: 10,
        borderColor: "rgba(255,255,255,0.5)",
        borderWidth: 2
    },
    followText: {
        fontSize: 10,
        color: colors.text,
        fontWeight: "600",
        marginLeft: 4,
    }
});
export default NotificationScreen;
