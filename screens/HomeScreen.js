import React, {useContext, useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    YellowBox,
    ToastAndroid,
    Alert,
    TouchableOpacity,
    Button,
    ActivityIndicator,
    LogBox,
    StatusBar, Picker, AppState, LinkingStatic as Linking, Platform,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import {colors, gs} from '../styles';
import { EvilIcons, Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import {LinearGradient} from "expo-linear-gradient";
import {mapDarkStyle} from "../model/mapData";
import {AuthContext} from "../navigation/AuthProvider";
import {apiUrl, SOCKET} from "../apiUrl";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as Location from 'expo-location';
import * as IntentLauncher from "expo-intent-launcher";
import moment from "moment";
import {Fontisto} from "react-native-vector-icons";
import {Avatar} from "react-native-elements";
import {Notifier, NotifierComponents, Easing} from "react-native-notifier";

const initialState = {
    latitude:  0, // 6.1585168
    longitude: 0, // 1.2600003
    latitudeDelta: 0.015,
    longitudeDelta: 0.0015,
}


const HomeScreen = ({navigation}) =>  {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [gravite, setGravite] = useState(0);
    const [nombreEngins, setNombreEngins] = useState(0);
    const [selectedValue, setSelectedValue] = useState(null);
    const [textGravite, setTextGravite] = useState('');
    const [currentPosition, setCurrentPosition] = useState(initialState);

    const [openSetting, setOpenSetting] = useState(true)
    const [dataSend, setDataSend] = useState(false)
    const [currentPositionAdresse, setCurrentPositionAdresse] = useState(
        {
        ville: '',
        region: '',
        rue: '',
        name: ''
    });

    const getLocationAsync = async() => {

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(" status", status)
            if (status !== 'granted') {

                ToastAndroid.show('Autorisation refusée.', ToastAndroid.LONG)
                console.log('Permission to access location was denied')
                return ;
            }
                // let location = await Location.getCurrentPositionAsync({});
                // console.log(location)
                ToastAndroid.showWithGravity('Recherche en cours ...', ToastAndroid.LONG, ToastAndroid.TOP)
                let { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High,
                    maximumAge: 2000, timeout: 20000});
                // console.log(location)
                if (coords) {
                    const { latitude, longitude } = coords;
                    let response = await Location.reverseGeocodeAsync({
                        latitude,
                        longitude
                    });

                    for (let item of response) {
                        let city = `${item.city}`;
                        let region = `${item.region}`;
                        let rue = `${item.street}`;
                        let name = `${item.name}`;

                        setCurrentPositionAdresse({
                            ...currentPositionAdresse,
                            ville: city,
                            region: region,
                            rue: rue,
                            name: name
                        })
                    }
                    setCurrentPosition({
                        ...currentPosition,
                        latitude: latitude,
                        longitude: longitude
                    })

            }


        }catch (e) {
            console.log(e)
        }
    };

    LogBox.ignoreAllLogs(true)

    // Avoir  id user connecté
    const { user,logout } = useContext(AuthContext);
    const userID = JSON.parse(user)
    const id = userID.data.iduser;
    const prenom1 = userID.data.prenomuser;
    const nom1 = userID.data.nomuser;
    const usertype = userID.data.usertype;
    //save location
    const saveLatLong = async () => {
        if ( currentPosition.latitude === 0 ){
            ToastAndroid.show('Actualiser votre position...', ToastAndroid.LONG)
        }else {
            bs.current.snapTo(0)
            await apiUrl.patch('users', {
                latuser: currentPosition.latitude,
                longuser: currentPosition.longitude,
                iduser: id
            } ).then(res => {
                console.log("update User: "+JSON.stringify(res.data))
            }).catch(e => {
                console.log(e)
            })
        }

    }

    // refresh location
   const  refresh = () => {
        setLoading(true)
       ToastAndroid.show('Patientez svp ...', ToastAndroid.LONG)
        setTimeout(async () => {
            if ((currentPosition.latitude || currentPosition.longitude) === 0 ) {
               Alert.alert('AUTORISATION', 'autoriser QUICKSAFE à acceder à votre position...', [
                   {
                       text : 'ok!',
                       onPress: () =>  getLocationAsync(),
                       style: 'cancel'
                   }
               ])
            } else {
                await getLocationAsync()
            }
           setLoading(false)
        }, 2000)

    }

    // save and data accident au pompier
    const SEND_DATA_ACCIDENT = () => {

            if (!gravite || !nombreEngins) {
                ToastAndroid.showWithGravity('Verifier les données svp ...', ToastAndroid.LONG, ToastAndroid.TOP)
            } else {
                setLoading(true)
                ToastAndroid.showWithGravity(' en cours...', ToastAndroid.LONG, ToastAndroid.TOP)

                setGravite(null)
                setNombreEngins(null)
                setTimeout( async () => {
                    try {
                        let iduser;
                        let gravity;
                        let engin;
                        let ville;
                        let region;
                        let rue;
                        let name;
                        let lat;
                        let long;
                        let created_at;


                        SOCKET.emit('sendData', {
                            iduser: id,
                            gravity: gravite,
                            engin: nombreEngins,
                            ville: currentPositionAdresse.ville,
                            region: currentPositionAdresse.region,
                            rue: currentPositionAdresse.rue,
                            name: currentPositionAdresse.name,
                            lat: currentPosition.latitude,
                            long: currentPosition.longitude,
                            created_at: moment()
                        });
                        await apiUrl.post('accidents', {
                            iduser: id,
                            graviteaccident: gravite,
                            nombredengins: nombreEngins,
                            ville: currentPositionAdresse.ville,
                            region: currentPositionAdresse.region,
                            rue: currentPositionAdresse.rue,
                            name: currentPositionAdresse.name,
                            lataccident: currentPosition.latitude,
                            longaccident: currentPosition.longitude
                        }).then(res => {
                            console.log("Data Accident : "+JSON.stringify(res.data))
                            if (res.data.code === 200) {
                                setDataSend(true);
                                ToastAndroid.showWithGravity('Transfere de donnée effectué', ToastAndroid.LONG, ToastAndroid.TOP)
                                console.log("alerte envoyée")
                            }
                        }).catch(e => {
                            console.log(e)
                        })
                    }catch (e) {
                        console.log(e)
                    }
                    setLoading(false)
                }, 3500)
                bs.current.snapTo(1)
            }
    }

   /*componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
  }*/



    //console.log(id)
    // fonction pour modifier la position de l'user
    const updateData = () => {
        if ((currentPosition.latitude || currentPosition.longitude) === 0 ) {
            Alert.alert('Verifier votre position svp' , 'reessayer encore s\'il vous plait...', [
                {
                    text : 'ok! Reessayer...',
                    onPress: () =>  getLocationAsync(),
                    style: 'cancel'
                }
            ])
        }  else {
            apiUrl.patch('users', {
                latuser: currentPosition.latitude,
                longuser: currentPosition.longitude,
                iduser: id
            } ).then(res => {
                console.log("update User: "+JSON.stringify(res.data))
            }).catch(e => {
                console.log(e)
            })
        }
    }
// Options data must contain 'item' & 'id' keys

    // fonction de l'enregistrement des données de l'accident
    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
               {/* <Text style={[styles.panelTitle, {fontFamily: 'Oswald-Bold'}]}>Formulaire</Text>*/}
                <Text style={[styles.panelSubtitle, { fontFamily: 'Oswald-Light'}]}>Renseigner correctement les données de l'accident</Text>
            </View>
            {/*Gravité de l'accident*/}

            <View style={{marginTop: 5, paddingHorizontal: 20, }}>
             <View>
                 <Text style={[ styles.textFamily, { color: colors.pink }]}> Gravité de l'accident  * /10 </Text>
             </View>
                <View style={{height: 50, borderRadius: 10}}>
                    <Picker
                        mode={"dialog"}
                        selectedValue={gravite}
                        onValueChange={(itemValue, itemPosition) => setGravite(itemValue)}
                        itemStyle={{marginTop: -80}}
                        Style={{marginTop: -80}}
                    >
                        <Picker.Item label={"Choisir..."} value={null} />
                        <Picker.Item label={"1"} value={"1"} />
                        <Picker.Item label={"2"} value={"2"} />
                        <Picker.Item label={"3"} value={"3"} />
                        <Picker.Item label={"4"} value={"4"} />
                        <Picker.Item label={"5"} value={"5"} />
                        <Picker.Item label={"6"} value={"6"} />
                        <Picker.Item label={"7"} value={"7"} />
                        <Picker.Item label={"8"} value={"8"} />
                        <Picker.Item label={"9"} value={"9"} />
                        <Picker.Item label={"10"} value={"10"} />
                    </Picker>
                </View>

            </View>
            {/*Nombre d'engins */}
            <View style={{marginTop: 5, paddingHorizontal: 20}}>
                <Text style={[ styles.textFamily, { color: colors.pink }]}> Nombre d'engins  *</Text>
                <View style={{height: 50, borderRadius: 10}}>
                    <Picker
                        mode={"dialog"}
                        selectedValue={nombreEngins}
                        onValueChange={(itemValue, itemPosition) => setNombreEngins(itemValue)}
                        itemStyle={{marginTop: -80}}
                        Style={{marginTop: -80}}
                    >
                        <Picker.Item label={"Choisir..."} value={null} />
                        <Picker.Item label={"1"} value={"1"} />
                        <Picker.Item label={"2"} value={"2"} />
                        <Picker.Item label={"3"} value={"3"} />
                        <Picker.Item label={"4"} value={"4"} />
                        <Picker.Item label={"5"} value={"5"} />
                        <Picker.Item label={"6"} value={"6"} />
                        <Picker.Item label={"7"} value={"7"} />
                        <Picker.Item label={"8"} value={"8"} />
                        <Picker.Item label={"9"} value={"9"} />
                        <Picker.Item label={"10"} value={"10"} />
                    </Picker>

                </View>

            </View>
            <View style={{paddingHorizontal: 20, marginVertical: 40, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={{borderColor: colors.pink,
                    flexDirection: 'row', justifyContent: 'space-between', borderWidth: 2,
                    alignItems: 'center', padding: 12, borderRadius: 10}}
                                  onPressIn={() => SEND_DATA_ACCIDENT()}>
                    <FontAwesome name="send-o" size={24} color="black" />
                    <Text style={{ fontFamily: 'Roboto-Bold',
                        textTransform: 'uppercase',
                        letterSpacing: 3,
                        }}>envoyer</Text>
                </TouchableOpacity>
            </View>

        </View>

    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );


   const bs = React.createRef();
   const fall = new Animated.Value(1);
    const snapp = windowHeight - 70;
     /*currentPosition.latitude ? (
      /!*<View style={styles.container}>
          <BottomSheet
              ref={bs}
              snapPoints={[snapp, 0]}
              renderContent={renderInner}
              renderHeader={renderHeader}
              initialSnap={1}
              callbackNode={fall}
              enabledGestureInteraction={true}

          />

        <MapView
          customMapStyle={mapDarkStyle}
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={currentPosition}
        >
        </MapView>
          <View style={{ flexDirection:  'row', justifyContent: 'space-between',
              width: windowWidth, position: 'absolute', top: 0, padding: 5  }}>
              <View>
                  <TouchableOpacity
                      style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 40,
                          paddingHorizontal: 20,
                          backgroundColor: colors.white,
                          borderWidth: 1,
                          borderRadius: 10,
                          padding: 5,
                          borderColor: colors.white,
                      }}
                      onPress={()=> navigation.openDrawer()}
                  >
                      <Ionicons name={"ios-menu"} size={24} color={colors.darkBg} />
                      <Text style={{ marginLeft: 10, color: colors.darkBg, textTransform: 'uppercase', fontFamily: 'Oswald-ExtraLight' }}> Quick safe</Text>
                  </TouchableOpacity>
              </View>
              <View >
                  <TouchableOpacity
                      style={{
                          alignItems: "center",
                          justifyContent: 'center',
                          marginTop: 45,
                          marginHorizontal: 10,
                          backgroundColor: colors.white,
                          borderWidth: 1,
                          padding: 2,
                          borderRadius: 60,
                          borderColor: colors.white,
                      }}
                      onPress={()=> refresh()}
                  >
                      <MaterialIcons
                          name="refresh"
                          size={24}
                          color={colors.darkBg} />
                  </TouchableOpacity>
              </View>
          </View>

      {(!(latitude && longitude ) !==  '')
      ? <>
              <View style={{
                  position: 'absolute',
                  bottom: 130,

              }}>

                  <TouchableOpacity
                      style={{
                          flexDirection: "row",
                          paddingHorizontal: 70,
                          marginTop: 40,
                          backgroundColor: colors.pink,
                          opacity: .8,
                          borderWidth: 1,
                          borderRadius: 20,
                          padding: 10,
                          borderColor: colors.pink,

                      }}
                      //onPress={() => this.setState({ modalVisible: true })}
                      onPress={() => {
                          bs.current.snapTo(0)
                          saveLatLong()
                      }}
                  >
                      <Ionicons name={"ios-flash-outline"} size={24} color={colors.white} />
                      <Text style={{ color: colors.white, textTransform: 'uppercase', fontFamily: 'Oswald-Medium' }}> Signaler</Text>
                  </TouchableOpacity>
                  <StatusBar barStyle={"light-content"} />
              </View>
       </>

      : <></> }
         {/!* {
              loading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <ActivityIndicator style={{
                              position: 'absolute', justifyContent: 'center',
                              alignItems: 'center', backgroundColor: colors.white,
                              width: 80, height: 80, borderRadius: 10
                          }} size={30} color={colors.pink}/>
                      </View>
                    : <></>
          }*!/}
          <View>
              <Loader loading={loading} color={'#ff66be'} />
          </View>
      </View>*!/
        <View style={styles.container}>
            <MapView
                customMapStyle={mapDarkStyle}
                zoomEnabled={true}
                pitchEnabled={true}
                showsUserLocation={true}
                followsUserLocation={true}
                showsCompass={true}
                showsBuildings={true}
                showsTraffic={true}
                showsIndoors={true}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                initialRegion={currentPosition}
            />
            <View style={{ flexDirection:  'row', justifyContent: 'space-between',
                width: windowWidth, position: 'absolute', top: 0, padding: 5  }}>
                <View>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 40,
                            paddingHorizontal: 20,
                            backgroundColor: '#e4e6eb',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 5,
                            borderColor: '#e4e6eb',
                        }}
                        onPress={()=> navigation.openDrawer()}
                    >
                        <Ionicons name={"ios-menu"} size={24} color={colors.darkBg} />
                        <Text style={{ marginLeft: 10, color: colors.darkBg, textTransform: 'uppercase', fontFamily: 'Oswald-ExtraLight' }}> Quick safe</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: 'center',
                            marginTop: 45,
                            marginHorizontal: 10,
                            backgroundColor: '#e4e6eb',
                            borderWidth: 1,
                            padding: 5,
                            borderRadius: 60,
                            borderColor: '#e4e6eb',
                        }}
                        onPress={()=> refresh()}
                    >
                        <MaterialIcons
                            name="refresh"
                            size={24}
                            color={colors.darkBg} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    ) : <ActivityIndicator
        animating={true}
        style={{ flex :1, justifyContent: 'center', alignItems: 'center'}} size="large"
        color={colors.pink} />*/
    console.log("after refresh location ", currentPosition)
    console.log("refresh location Adress ", currentPositionAdresse)

    useEffect(() => {
        setLoading(true);
        ToastAndroid.show('Chargement...', ToastAndroid.LONG)
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])

    return (

        <View style={styles.container}>

              <MapView
                   customMapStyle={mapDarkStyle}
                   zoomEnabled={true}
                   pitchEnabled={true}
                   showsUserLocation={true}
                   followsUserLocation={true}
                   showsCompass={true}
                   showsBuildings={true}
                   showsTraffic={true}
                   showsIndoors={true}
                   loadingEnabled={true}
                   toolbarEnabled={true}
                   showsScale={true}
                   zoomControlEnabled={false}
                   loadingBackgroundColor={colors.white}
                   loadingIndicatorColor={colors.pink}
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={styles.map}
                  region={{
                      latitude: currentPosition.latitude == 0 ? 6.1585168 : currentPosition.latitude ,
                      longitude: currentPosition.longitude == 0 ? 1.2600003 : currentPosition.longitude,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0015,
                  }}
             />
          <BottomSheet
              ref={bs}
              snapPoints={[snapp, 0]}
              renderContent={renderInner}
              renderHeader={renderHeader}
              initialSnap={1}
              callbackNode={fall}
              enabledGestureInteraction={true}
          />
          <View style={{ flexDirection:  'row', justifyContent: 'space-between',
              width: windowWidth, position: 'absolute', top: 0, padding: 5  }}>
              <View>
                  <TouchableOpacity
                      style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 40,
                          paddingHorizontal: 20,
                          backgroundColor: colors.white,
                          borderWidth: 1,
                          borderRadius: 10,
                          padding: 5,
                          borderColor: colors.white,
                      }}
                      onPress={()=> navigation.openDrawer()}
                  >
                      <Ionicons name={"ios-menu"} size={24} color={colors.darkBg} />
                      <Text style={{ marginLeft: 10, color: colors.darkBg, textTransform: 'uppercase', fontFamily: 'Oswald-ExtraLight' }}> Quick safe</Text>
                  </TouchableOpacity>
              </View>

              <View >
                  <TouchableOpacity
                      style={{
                          alignItems: "center",
                          justifyContent: 'center',
                          marginTop: 38,
                          marginHorizontal: 10,
                          borderWidth: 1,
                          padding: 2,
                          backgroundColor: colors.pink,
                          borderRadius: 40,
                          borderColor: colors.pink,
                      }}
                      onPress={()=> navigation.navigate('Profile')}
                  >
                      <Avatar
                          size="small"
                          title={`${nom1[0]}${prenom1[0]}`}
                          titleStyle={{
                              shadowColor: colors.darkBg,
                              fontFamily: 'Teko-Medium',
                              shadowOffset:  { height: 3, width: 1},
                          }}
                          rounded
                          style={[styles.follow, { width: 40, height: 40,
                              borderRadius: 32,
                              opacity: 1,
                              shadowColor: colors.darkBg,
                              fontFamily: 'Teko-Bold',
                              shadowOffset:  { height: 3, width: 1},
                              shadowOpacity: 0.5,
                          }]}
                      >
                          <Avatar.Accessory  />
                      </Avatar>
                  </TouchableOpacity>
              </View>
          </View>


            <View style={{
                position: 'absolute',
                bottom: 160,
                right: 20
            }}>

                <LinearGradient  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 30,
                    borderColor: colors.pink,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderTopRadius: 200,
                    borderBottomRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}  colors={[colors.white, colors.white]} start={[0, 0]} end={[1, 1]} >
                    <TouchableOpacity onPress={() => refresh()} >
                        <MaterialIcons
                            name="refresh"
                            size={24}
                            color={colors.pink} />
                    </TouchableOpacity>
                </LinearGradient>
                <StatusBar barStyle={"light-content"} />
            </View>  
          {
              (currentPosition.latitude || currentPosition.longitude) !== 0
              ?
              (
                  <View style={{
                      position: 'absolute',
                      bottom: 100,

                  }}>

                      <TouchableOpacity
                          style={{
                              flexDirection: "row",
                              paddingHorizontal: 70,
                              marginTop: 40,
                              backgroundColor: colors.pink,
                              opacity: .8,
                              borderWidth: 1,
                              borderRadius: 20,
                              padding: 10,
                              borderColor: colors.pink,

                          }}
                          //onPress={() => this.setState({ modalVisible: true })}
                          onPress={() => {
                              saveLatLong()
                          }}
                      >
                          <Ionicons name={"ios-flash-outline"} size={24} color={colors.white} />
                          <Text style={{ color: colors.white, textTransform: 'uppercase', fontFamily: 'Oswald-Medium' }}> Signaler</Text>
                      </TouchableOpacity>
                      <StatusBar barStyle={"light-content"} />
                  </View>
              ) : (

                      <View style={{
                          position: 'absolute',
                          bottom: 100,
                          right: 20

                      }}>

                          <LinearGradient  style={{
                              width: 55,
                              height: 55,
                              borderRadius: 30,
                              borderColor: colors.pink,
                              borderWidth: StyleSheet.hairlineWidth,
                              borderTopRadius: 200,
                              borderBottomRadius: 100,
                              justifyContent: 'center',
                              alignItems: 'center',
                          }}  colors={[colors.pink, colors.orangeLg]} start={[0, 0]} end={[1, 1]} >
                              <TouchableOpacity onPressIn={ () => getLocationAsync()} >
                                  <Ionicons name="md-location-outline" size={24} color={colors.white} />
                              </TouchableOpacity>
                          </LinearGradient>
                          <StatusBar barStyle={"light-content"} />
                      </View>
                  )
          }
          {
              loading ?
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <ActivityIndicator style={{
                      position: 'absolute', justifyContent: 'center',
                      alignItems: 'center', backgroundColor: colors.white,
                      width: 80, height: 80, borderRadius: 10
          }} size='large' animating={true} color={colors.pink}/>
              </View>
              : <></>
          }
      </View>  
  )
};


export default HomeScreen;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#ecf0f1'
    },
    imageContainer: {
        ...gs.center,
        marginTop: 10,
        shadowColor: colors.darkBg,
        shadowOffset:  { height: 3, width: 1},
        shadowOpacity: 0.5,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center'
    },
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 450,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab :{ 
    //bottom: 10,
   // position: 'absolute',
   // margin: 20,
     // zIndex: 1,
    //right: 0,
      height: 60,
      //width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: 'transparent',

  },
  fabRefresh :{ 
    top: -40,
    zIndex: 1,
    position: 'absolute', 
    margin: 20, 
    right: 0,
    
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 50
  },
    RigthCircle: {
        backgroundColor: colors.pink,
        position: 'absolute',
        width:  200,
        height: 210,
        borderRadius: 200,
        left:10,
        top: -40,

    },
    leftCircle: {
        backgroundColor: colors.orange,
        position: 'absolute',
        width:  200,
        height: 200,
        borderRadius: 100,
        left: -55,
        top: -60,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        height: windowHeight,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    textFamily: {
        fontFamily:  'Oswald-Light',
        fontSize: 15,
        marginHorizontal: -1,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        //elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 0,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
 });


