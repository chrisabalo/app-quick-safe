import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
} from 'react-native';
import {colors} from "./styles";

const EditProfileScreen = () => {


    return (
        <View style={styles.container}>
            <Text>Edit Profile</Text>
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});