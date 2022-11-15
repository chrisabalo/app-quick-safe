import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { gs, colors } from '../styles'

export default function About() {
    return (
        <View style={styles.container}>
            <Text style={gs.sectionTitle}> APROPOS DE MOI</Text>
            <Text style={styles.about}> Lorem</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 32,
    },
    about: {
        fontSize: 15,
        fontWeight: "500",
        color: colors.darkHl,
        marginTop: 8,
        lineHeight: 22
    }
})
