import React, {Component, useContext, useState} from 'react'
import {Text, StyleSheet, View, TouchableOpacity, Share} from 'react-native'
import {Ionicons, Entypo } from 'react-native-vector-icons/'
import {gs, colors} from '../styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native'
import { Avatar } from 'react-native-elements'
import { windowHeight } from '../utils/Dimentions'
import {AuthContext} from "../navigation/AuthProvider";
import {FontAwesome, MaterialIcons} from "react-native-vector-icons";
import Sharing from "expo-sharing";

const Header = ({navigation}) => {
    const {user} = useContext(AuthContext)
    const res = JSON.parse(user)
    const nom1 = res.data.nomuser;
    const prenom1 = res.data.prenomuser;
    const usertype = res.data.usertype;
    console.log(usertype)

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
        return (
            <LinearGradient colors={[colors.orange, colors.pink]} start={[0, 0]} end={[1, 1]} >
                <View style={{ marginHorizontal: 21, paddingVertical: 54 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", height: 50, marginTop: - 20}}>
                            <Text style={[gs.subTitle, { fontFamily: 'Oswald-ExtraLight'}]}>MON PROFILE</Text>
                           {/*<TouchableOpacity>
                               <View style={styles.fake_icon_box} >
                               <FontAwesome name="angle-left"  size={24} color={colors.darkBg} />
                               </View>
                           </TouchableOpacity>

                        <View style={styles.fake_icon_box}>
                            <MaterialIcons name="mode-edit" size={24} size={24} color={colors.darkBg} />
                        </View>*/}
                    </View>
                    <View style={styles.imageContainer} >
                        <View>
                            <View style={styles.check}>
                                <Ionicons name="md-checkmark" size={20} color={colors.pink} /> 
                            </View>
                            <Avatar
                                    size="large"
                                    title={`${nom1[0]}${prenom1[0]}`}
                                    rounded
                                    titleStyle={{
                                        fontFamily: 'Oswald-Medium',
                                        fontSize: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        flex: 1,
                                    }}
                                    style={[styles.follow, { width: 100, height: 100,
                                        borderRadius: 32,
                                        opacity: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        shadowColor: colors.darkBg,
                                        fontFamily: 'Oswald-Bold',
                                        shadowOffset:  { height: 3, width: 1},
                                        shadowOpacity: 0.5,
                                    }]}
                             />

                        </View>
                    </View>

                    <View style={[gs.center, { marginVertical: 10}]}>
                        <Text style={[gs.title]}>{prenom1} </Text>
                        <Text style={[gs.subTitle]}>{nom1}</Text>
                        <Text style={[gs.subTitle, {marginTop: 2, fontFamily: 'Oswald-ExtraLight'}]}>
                            {
                                usertype === null ? 'VISITEUR' : usertype
                            }
                        </Text>
                        <TouchableOpacity style={styles.follow} onPress={myCustomShare}>
                            <Entypo name="share" size={20} color="rgba(255,255,255,0.6)"/>
                            <Text style={styles.followText}>Partager</Text>
                        </TouchableOpacity>
                       
                    </View>
                </View>
            </LinearGradient>
        )

}
export  default Header

const styles = StyleSheet.create({
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
   },
    fake_icon_box: {
        backgroundColor: '#e4e6eb',
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
