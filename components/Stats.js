import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {gs, colors} from '../styles'
import {AuthContext} from "../navigation/AuthProvider";
import {apiUrl} from "../apiUrl";


const Stats = () => {
    const {user} = useContext(AuthContext)
    const res = JSON.parse(user)
    const id = res.data.iduser
    const [alerte, setAlertes] = useState(0);
    const [totalAlerte, setTotalAlertes] = useState(0);

    useEffect(()=> {
        COUNT_ALERTES_USER_ID();
        COUNT_ALL_ALERTES();
    }, [])
    const COUNT_ALERTES_USER_ID = async () => {
        try {
            await apiUrl.get(`accidents/alertes/${id}`).then(resp => {
                let data = resp.data.data
                setAlertes(data[0].total)
                console.log(data[0].total)
                console.log('count ', data[0].total)
            })
        }catch (e) {
            console.log(e)
        }
    }
    const COUNT_ALL_ALERTES = async () => {
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

    console.log(id)
    return (
        <View style={styles.container}>
            <View style={[styles.statContainer, styles.divider]}>
                <Text style={styles.statNumber}>{alerte != '' ? alerte : 0 }</Text>
                <Text style={styles.stat}>{alerte == 0 ? 'alerte emise' : alerte == 1 ? 'alerte emise' : 'alertes emises'}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statNumber}>{totalAlerte}</Text>
                <Text style={styles.stat}>Notifications</Text>
            </View>
        </View>
        
    )
}

export default Stats

const styles = StyleSheet.create({
    container: {
        ...gs.sectionContainer,
        ...gs.rowBetween,
        marginHorizontal: 15,
        borderRadius: 16,
        marginTop: -48,
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
     statContainer: {
         ...gs.center,
         flex: 1
     },
     statNumber: {
         fontSize: 50,
         fontWeight: "900",
         color: colors.text,
         fontFamily: 'Teko-Bold'
     },
     stat: {
         fontSize: 10,
         fontWeight: "600",
         letterSpacing: 1,
         textTransform: "uppercase",
         color: colors.lightHl,
         marginTop: 6
     },
     divider: {
        // borderLeftWidth: 1,
         borderRightWidth: 1,
         borderColor: colors.darkHl
    }
})
