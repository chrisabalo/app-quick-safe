import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import {colors, gs} from '../styles'
import {Feather, FontAwesome, Fontisto, Ionicons} from "react-native-vector-icons";


const AproposScreen = ({navigation}) => {
    return (
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ padding: 10, width: "100%", backgroundColor: colors.pink, height: 200, paddingBottom: 30 }}>
                    {/*<View style={[gs.rowBetween, { marginVertical: 30, marginHorizontal: 10 }]}>
                        <View  >
                            <TouchableOpacity onPress={()=> navigation.openDrawer()}>
                                <Feather name="align-left" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Ionicons name="help-circle-outline" size={24} color={colors.darkBg} />
                        </View>
                    </View>*/}
                    <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 30, marginHorizontal: 10 }}>
                        <Text style={[gs.subTitle, { fontFamily: 'Oswald-ExtraLight'}]}> APROPOS</Text>
                        {/*<TouchableOpacity>
                               <View style={styles.fake_icon_box} >
                               <FontAwesome name="angle-left"  size={24} color={colors.darkBg} />
                               </View>
                           </TouchableOpacity>

                        <View style={styles.fake_icon_box}>
                            <MaterialIcons name="mode-edit" size={24} size={24} color={colors.darkBg} />
                        </View>*/}
                    </View>
                    <TouchableOpacity>
                        <View></View>
                        <View></View>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                
                <Avatar.Image  source={require('../assets/quick-safe.png')}
            style={{ height: 180, width: 180,  borderRadius: 100, marginTop: -90,
                backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center"}} />
                <Text style={{ fontSize: 25, padding: 10,
                    textTransform: 'uppercase', fontFamily: 'Oswald-Bold' }}>Quick Safe</Text>
                <Text style={{ fontSize: 15, color: "gray", fontFamily: 'Oswald-ExtraLight' }}>version 1.0.1</Text>
                <Text style={{ fontSize: 15, color: "gray", fontFamily: 'Oswald-Bold' }}>28 mars 2021 </Text>
                
                <TouchableOpacity style={{
                    backgroundColor: colors.pink,
                    padding: 20,
                    marginTop: 10,
                    alignItems: 'center', justifyContent: "center", flex: 1, alignContent: "center", position: "relative"
                }} >
                    <Text style={{ fontSize: 15, color: "#fff", fontFamily: 'Oswald-ExtraLight' }}> Mention Légal</Text>
                </TouchableOpacity>
                </View>
                
            </ScrollView>
    )
}

export default AproposScreen
