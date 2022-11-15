import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {colors} from "../styles";

export default class AddAccident extends React.Component {

    render() {
        return (
            <View style={{ position: 'absolute', alignItems: 'center' }} >
                <View>
                    <TouchableHighlight underlayColor={'#7f58ff'} >
                        <View style={styles.button}>
                            <FontAwesome5 name={'plus'} color={'#fff'} size={15} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const  styles = StyleSheet.create({
    button: {
        backgroundColor: colors.pink,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 48 / 2,
        position: 'absolute',
        left: -15,
        bottom: -20,
        shadowColor: colors.orange,
        shadowRadius: 5,
        shadowOffset: { height: 10},
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#fff",
    }
})