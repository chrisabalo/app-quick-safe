import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image, Platform
} from 'react-native';
import {colors} from "../styles";
import {Fontisto} from "react-native-vector-icons";


const FormAccidentScreen = ({navigation}) => {


 /*
  function renderHeader() {
      return(
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 40,
              paddingHorizontal: 20
            }}
            onPress={()=>navigation.goBack()}
          >
          <Ionicons name={"ios-arrow-back"} size={24} color={colors.white} />
          <Text style={{ marginLeft: 10, color: colors.white, fontFamily: 'Oswald-ExtraLight' }}> Accident</Text>
          </TouchableOpacity>
      )
  }
  function renderLogo() {
    return(
        <View
          style={{
            marginTop: 40,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
            <View
                style={{
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ textTransform: "uppercase", fontFamily: 'Teko-Medium', lineHeight: 100, fontSize: 60 }} > Quick safe</Text>
            </View>

        </View>
    )
  }
  function renderForm() {
    return(
        <View style={{
          marginTop: 10,
          marginHorizontal: 20
        }}>
          {/!*Gravite de l'accident*!/}
          <View style={{marginTop: 20, paddingHorizontal: 10}}>
            <Text style={{ color: colors.white }}> Gravité de l'accident</Text>
            <TextInput
              style={{
                marginVertical: 8,
                borderBottomColor: colors.white,
                borderBottomWidth: 1,
                height: 40,
                color: colors.white,
              }}
              placeholder={'Entrer la gravité de l\'accident | Ex: 6/10'}
              placeholderTextColor={colors.white}
              selectionColor={colors.white}
              keyboardType={"number-pad"}
            />
          </View>
          {/!* Nombre d'engins *!/}
          <View style={{marginTop: 20, paddingHorizontal: 10}}>
            <Text style={{ color: colors.white }}> Nombre d'engins</Text>
            <TextInput
                style={{
                  marginVertical: 8,
                  borderBottomColor: colors.white,
                  borderBottomWidth: 1,
                  height: 40,
                  color: colors.white,
                }}
                placeholder={'Entrer le nombre d\'engins'}
                placeholderTextColor={colors.white}
                selectionColor={colors.white}
                keyboardType={"number-pad"}
            />
          </View>
        </View>
    )
  }
  function renderButton() {
    return(
        <View style={{ margin: 30}}>
            <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: colors.darkBg,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={()=>alert('Donnée envoyées!')}
            >
              <Text style={{ color: colors.white, fontSize: 20, lineHeight: 22, fontFamily: "Oswald-Medium"}}>Envoyer</Text>
            </TouchableOpacity>
        </View>
    )
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? "height": "padding"}
      style={{ flex: 1}}
    >

      <LinearGradient colors={[colors.pink, colors.orange]} style={{ flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>

    </KeyboardAvoidingView>
  )
*/


    return (
        <TouchableOpacity >
            <View style={{
                width: 55,
                height: 55,
                backgroundColor: 'white',
                borderRadius: 30,
                borderColor: colors.pink,
                borderWidth: StyleSheet.hairlineWidth,
                borderTopRadius: 200,
                borderBottomRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Platform.OS == "android" ? 50 : 30
            }}>
               {/* {
                    (currentPosition && currentPosition.latitude !== null) ? (<Fontisto
                        name={'flash'}
                        size={24}
                        color={colors.pink}
                    />) : (<Image
                        source={require('../assets/quick-safe.png')}
                        style={{
                            width: 50,
                            height: 50,
                            tintColor: colors.pink,
                            resizeMode: 'contain'
                        }}
                    ></Image>)
                }*/}
                {/*<Fontisto
                    name={'flash'}
                    size={24}
                    color={colors.pink}
                />*/}
                <Image
                    source={require('../assets/quick-safe.png')}
                    style={{
                        width: 40,
                        height: 40,
                        tintColor: colors.darkBg,
                        resizeMode: 'contain'
                    }}
                ></Image>
            </View>
        </TouchableOpacity>
    )
}

export default FormAccidentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.textSec
  },
  input: {
    marginTop: 20,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.pink,
    borderRadius: 5,
    paddingHorizontal: 16,
    color:colors.white,
    fontWeight: '600',
    padding: 10,
  },
})