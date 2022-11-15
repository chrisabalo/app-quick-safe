import React, {useContext, useState} from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import { Image } from 'react-native'
import { gs, colors } from '../styles'
import {Entypo, Fontisto, Ionicons, MaterialCommunityIcons} from 'react-native-vector-icons'
import {AuthContext} from "../navigation/AuthProvider";

const Location = () => {

    const {user} = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const [load, setLoad] = useState(true)
    const res = JSON.parse(user)
    const userID = res.data.iduser;
    const nom1 = res.data.nomuser;
    const prenom1 = res.data.prenomuser;
    const adresse1 = res.data.adresseuser;
    const telephone1 = res.data.telephoneuser;
    const groupeSangin1 = res.data.groupesanguin;
    const email1 = res.data.emailuser;
    const personneContacter1 = res.data.personeacontacter;
    console.log(prenom1)

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom: 100}}>
            <View style={[styles.container]}>
                <View style={{ width: 100, height: 100, justifyContent: "center"}}>
                    <MaterialCommunityIcons name="email-sync" size={40} color={colors.pink} />
                </View>
                <View style={{ flex: 1}}>
                    <Text style={styles.location}>{email1}</Text>
                    <Text style={styles.distance}>email</Text>
                </View>
                {/*<Entypo name="chevron-right" size={24} color={colors.darkHl} />*/}
            </View>
            <View style={styles.container}>
                <View style={{ width: 100, height: 100, justifyContent: "center"}}>
                    <Ionicons name="location" size={40}  color={colors.pink}  />
                </View>
                <View style={{ flex: 1}}>
                    <Text style={styles.location}>{adresse1}</Text>
                    <Text style={styles.distance}>adresse</Text>
                </View>
                {/*<Entypo name="chevron-right" size={24} color={colors.darkHl} />*/}
            </View>
            <View style={styles.container}>
                <View style={{ width: 100, height: 100, justifyContent: "center"}}>
                    <MaterialCommunityIcons name="cellphone-basic"  size={40}  color={colors.pink} />
                </View>
                <View style={{ flex: 1}}>

                    <Text style={styles.location}>{telephone1}</Text>
                    <Text style={styles.distance}>telephone</Text>
                </View>
                {/*<Entypo name="chevron-right" size={24} color={colors.darkHl} />*/}
            </View>
            <View style={styles.container}>
                <View style={{ width: 100, height: 100, justifyContent: "center"}}>
                    <MaterialCommunityIcons name="heart-plus" size={40}  color={colors.pink} />
                </View>
                <View style={{ flex: 1}}>
                    <Text style={styles.location}>{groupeSangin1}</Text>
                    <Text style={styles.distance}>groupe sanguin</Text>
                </View>
                {/*<Entypo name="chevron-right" size={24} color={colors.darkHl} />*/}
            </View>
            <View style={styles.container}>
                <View style={{ width: 100, height: 100, justifyContent: "center"}}>
                    <Ionicons name="ios-person-add" size={40}  color={colors.pink}  />
                </View>
                <View style={{ flex: 1}}>
                    <Text style={styles.location}>{personneContacter1}</Text>
                    <Text style={styles.distance}>personne à contacter</Text>
                </View>
                {/*<Entypo name="chevron-right" size={24} color={colors.darkHl} />*/}
            </View>
            <View style={styles.container}>
                <View style={{ width: 100, height: 100, justifyContent: "center"}}>
                    <Fontisto name="person" size={40}  color={colors.pink} />
                </View>
                <View style={{ flex: 1}}>
                    <Text style={styles.location}>{prenom1}</Text>
                    <Text style={styles.distance}>prenom</Text>
                </View>
                {/*<Entypo name="chevron-right" size={24} color={colors.darkHl} />*/}
            </View>
            <View style={[styles.container]}>
                <View style={{ width: 100, height: 100, justifyContent: "center"}}>
                    <Ionicons name="ios-person" size={40}  color={colors.pink} />
                </View>
                <View style={{ flex: 1}}>
                    <Text style={styles.location}>{nom1}</Text>
                    <Text style={styles.distance}>Nom</Text>
                </View>
                {/*<Entypo name="chevron-right" size={24} color={colors.darkHl} />*/}
            </View>
        </ScrollView>
    )
}
export  default Location
const styles = StyleSheet.create({
    container: {
        ...gs.rowCenter,
       backgroundColor: colors.lightBg,
       paddingHorizontal: 16,
       paddingVertical: 5,
       borderRadius: 20,
       marginVertical: 10,
       marginHorizontal: 15

    },
    fake_icon_box: {
        backgroundColor: '#e4e6eb',
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    location: {
        fontSize: 18,
        color: colors.text,
        fontWeight: "500",
        fontFamily: 'Teko-Medium'

    },
    distance: {
        ...gs.smallText,
        color: colors.darkHl,
        marginTop: 4,
        textTransform: "uppercase"
    }
})
