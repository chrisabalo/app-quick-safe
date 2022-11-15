import React, {useContext, useEffect, useState} from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
    TouchableWithoutFeedback, FlatList, Picker, ToastAndroid, ActivityIndicator, Alert
} from 'react-native'
import { Entypo, Ionicons, Fontisto } from '@expo/vector-icons';
import { colors } from '../styles';
import {windowHeight, windowWidth} from "../utils/Dimentions";
import {AuthContext} from '../navigation/AuthProvider'

import LoadingView from "react-native-loading-view";


const  SignupScreen = ({navigation}) => {



  const [areas, setAreas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

  /*constante d' inscricription*/

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [adresse, setAdresse] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [personneContacter, setPersonneContacter] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [password, setPassword] = useState('');

   const { register } = useContext(AuthContext)

  useEffect(() => {
      fetch("https://restcountries.com/v2/all")
          .then( response => response.json())
          .then( data => {
              let areaData = data.map( item => {
                  return {
                      code: item.alpha2Code,
                      name: item.name,
                      callingCode: `+${item.callingCodes[0]}`,
                      flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`
                  }

              })   
              setAreas(areaData)
              if (areaData.length > 0) {
                  let defaultData = areaData.filter( a => a.code == "TG")
                  if (defaultData.length > 0 ) {
                      setSelectedArea( defaultData[0])
                  }
              }
          })
  }, [])
    //Function to register new user
    let PASSWORD_REGEX_3=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const registerHandle = (firstName, lastName, telephone, adresse, email, personneContacter, selectedValue, password) => {
       if (!firstName || !lastName || !telephone || !adresse || !email ||
           !personneContacter || !selectedValue || !password) {
           ToastAndroid.showWithGravity(' Renseignez les informations svp...', ToastAndroid.LONG, ToastAndroid.TOP)
       }
        else if (firstName.length < 4 ) {
           ToastAndroid.showWithGravity('Le nom est trop court svp...', ToastAndroid.SHORT, ToastAndroid.TOP)
            }
       else if ( lastName.length < 4 ) {
           ToastAndroid.showWithGravity('Le prenom es tropt court svp...', ToastAndroid.SHORT, ToastAndroid.TOP)
       }
        else if (telephone.length < 8) {
           ToastAndroid.showWithGravity('Le numero est invalide  ...', ToastAndroid.SHORT, ToastAndroid.TOP)
            }
        else if (!(email.match(re))) {
           ToastAndroid.showWithGravity(' L\'email est invalide  ...', ToastAndroid.SHORT, ToastAndroid.TOP)
             }
        else if (password.length < 6) {
           ToastAndroid.showWithGravity('Le mot de passe est trop court / 6 caracteres minimum...', ToastAndroid.SHORT, ToastAndroid.TOP)
            }
       /* else if (!(password.match(PASSWORD_REGEX_3))) {
           ToastAndroid.showWithGravity('Le mot de passe est trop faible svp... \n - au moins un nombre \n - au moins un caractère spécial...', ToastAndroid.SHORT, ToastAndroid.TOP)
            }*/
        else if ( register(firstName, lastName, telephone, adresse, email, personneContacter,
           selectedValue, password)) {

           //ToastAndroid.showWithGravity(' Votre mot de passe est incorrecte...', ToastAndroid.SHORT, ToastAndroid.TOP)
           setLoading(true)
           ToastAndroid.showWithGravity('requete en cours ...', ToastAndroid.SHORT, ToastAndroid.TOP)
           setTimeout(() => {
              console.log("Compte creée")
               ToastAndroid.showWithGravity('Votre compte a ete créee..', ToastAndroid.SHORT, ToastAndroid.TOP)
             /*  Alert.alert('IDENTIFICATION' , 'votre compte a été crée avec succes\n\n Utiliser votre email et mot de passe pour vous connecter...', [
                   {
                       text : 'je vailde!',
                       style: 'cancel'
                   }
               ])*/
               setLoading(false)
              navigation.navigate('Login')
          },2500)

               setFirstName('')
               setLastName('')
               setTelephone('')
               setAdresse('')
               setEmail('')
               setPersonneContacter('')
               setSelectedValue('')
               setPassword('')
             }


    }

    function renderAreaCodesModal() {
       const renderItem = ({item}) => {
           return (

                  <TouchableOpacity style={{ padding: 10, flexDirection: 'row'}}
                                    onPress={() => {
                                        setSelectedArea(item)
                                        setModalVisible(false)
                                    }}
                  >
                      <Image source={{ uri: item.flag}}
                             style={{
                                 width: 30,
                                 height: 30,
                                 marginRight: 10
                             }}
                      />
                      <Text style={{ fontSize: 15, fontFamily: 'Oswald-Light'}}> {item.name} ({item.callingCode}) </Text>
                  </TouchableOpacity>
           )
       }
        return(

            <Modal
                animationType={"slide"}
                visible={modalVisible}
                transparent={true}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{
                            height: windowHeight,
                            width: windowWidth,
                            backgroundColor: colors.white,
                            borderRadius: 20
                        }}>
                           <View style={{ flexDirection: 'row', marginTop: 40,
                               height: 50, marginLeft: 20 }}>
                               <Fontisto name="world-o" size={24} color="black" />
                               <Text style={[ styles.textFamily, { color: colors.pink,
                                   }]}> Choisissez Votre pays</Text>
                           </View>
                           <View>
                               <FlatList data={areas} renderItem={renderItem}
                                         keyExtractor={item => item.code }
                                         showsVerticalScrollIndicator={false}
                                         style={{
                                             padding: 10,
                                             marginBottom: 10,
                                             
                                         }}
                               />
                           </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>

        )
    }

    if (loading) return <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.dark }} color={colors.pink}
        size='large' animating={true}
    />;


    return (
      <View style={styles.container}>
        <View style={styles.closeContainer}>
          <TouchableOpacity style={styles.close}  onPress={() => navigation.goBack()}>
              <Ionicons name="ios-close-outline" size={20} color={ colors.dark} />
          </TouchableOpacity>
        </View>
         <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1,alignContent: 'center', marginTop: 0, justifyContent: 'center'}}>
            <Text style={styles.account}>Créer un compte</Text>
          </View>
            <View style={{ marginHorizontal: 5 }}>
                {/*Nom*/}
                <View style={{marginTop: 5, paddingHorizontal: 10}}>
                    <Text style={[ styles.textFamily, { color: colors.pink }]}> Nom</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'Entrer le nom'}
                        placeholderTextColor={colors.white}
                        selectionColor={colors.white}
                        keyboardType={"name-phone-pad"}

                        onChangeText={(userfirstName)=> setFirstName(userfirstName.trim().toUpperCase())}
                    />
                </View>
                {/*Prenom*/}
                   <View style={{marginTop: 5, paddingHorizontal: 10}}>
                       <Text style={[ styles.textFamily, { color: colors.pink }]}> Prénom</Text>
                       <TextInput
                           style={styles.inputStyle}
                           placeholder={'Entrer le Prénom'}
                           placeholderTextColor={colors.white}
                           selectionColor={colors.white}

                           onChangeText={(userLastName) => setLastName(userLastName.trim())}
                       />
                   </View>
                

                {/*Adresse */}
                <View style={{marginTop: 5, paddingHorizontal: 10}}>
                    <Text style={[ styles.textFamily, { color: colors.pink }]}> Adresse</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'Entrer l\'adresse ( BP 404 lomé)'}
                        placeholderTextColor={colors.white}
                        selectionColor={colors.white}

                        onChangeText={(userAdresse) => {
                            setAdresse(userAdresse.trim())
                        }}
                    />

                </View>
                {/*Email */}
                <View style={{marginTop: 5, paddingHorizontal: 10}}>
                    <Text style={[ styles.textFamily, { color: colors.pink }]}> Email</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'Entrer l\'email'}
                        placeholderTextColor={colors.white}
                        selectionColor={colors.white}
                        keyboardType={"email-address"}
                        onChangeText={(userEmail) => setEmail(userEmail.trim())}
                    />
                </View>

            <View style={{marginTop: 5, paddingHorizontal: 10}}>
                <Text style={[ styles.textFamily, { color: colors.pink }]}> Numéro de Téléphone</Text>
                <View style={{ flexDirection: 'row'}}>
                    {/*country code*/}
                    <TouchableOpacity style={[ styles.inputStyle, {
                        width: 100,
                        height: 50,
                        marginHorizontal: 3,
                        flexDirection: 'row'
                    }]} onPress={()=> setModalVisible(true) }>
                        <View style={{
                            justifyContent: 'center',
                        }} >
                            <Ionicons name={'ios-chevron-down-outline'} size={10} color={colors.white} />
                        </View>
                        <View style={{
                            justifyContent: 'center', marginLeft: 2
                        }}>
                            <Image source={{ uri: selectedArea?.flag }}
                                   resizeMode={'contain'}
                                   style={{
                                       width: 30,
                                       height: 30
                                   }}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', marginLeft: 2}}>
                            <Text style={[ styles.textFamily, { color: colors.white}]}> { selectedArea ?.callingCode}</Text>
                        </View>
                    </TouchableOpacity>
                    {/*Phone Number*/}
                    <TextInput
                        style={[styles.inputStyle, { flex: 1, marginVertical: 10}]}
                        placeholder={'Entrer le Numéro de Telephone'}
                        placeholderTextColor={colors.white}
                        selectionColor={colors.white}
                        keyboardType={"number-pad"}
                        onChangeText={(userTelephone) => setTelephone(selectedArea ?.callingCode +" " + userTelephone)}
                    />
                </View>
            </View>

                {/*Personne à contacter */}
                <View style={{marginTop: 5, paddingHorizontal: 10}}>
                    <Text style={[ styles.textFamily, { color: colors.pink }]}> Personne à contacter</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'Personne à contacter'}
                        placeholderTextColor={colors.white}
                        selectionColor={colors.white}
                        onChangeText={(userContacter) => setPersonneContacter(userContacter.trim())}
                    />
                </View>
                {/*Groupe sanguin */}
                <View style={{marginTop: 5, paddingHorizontal: 10}}>
                    <Text style={[ styles.textFamily, { color: colors.pink }]}> Groupe sanguin</Text>
                    <View style={ [styles.inputStyle, styles.textFamily]}>
                        <Picker
                            mode={"dialog"}
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex1) => setSelectedValue(itemValue)}

                            style={[styles.textFamily, { color: colors.white, opacity: .6, marginHorizontal: -5, letterSpacing: 2 }]}
                            itemStyle={{ fontFamily: 'Oswlad-ExtraLight'}}
                        >
                            <Picker.Item  label="Votre groupe sanguin" value={null} />
                            <Picker.Item  label="A+" value="A+" />
                            <Picker.Item  label="A-" value="A-" />
                            <Picker.Item label="B+" value="B+" />
                            <Picker.Item  label="B-" value="B-" />
                            <Picker.Item label="AB+" value="AB+" />
                            <Picker.Item label="AB-" value="AB-" />
                            <Picker.Item label="O+" value="O+" />
                            <Picker.Item label="O-" value="O-" />
                        </Picker>
                    </View>
                </View>
                {/*Mot de passe */}
                <View style={{marginTop: 5, paddingHorizontal: 10}}>
                    <Text style={[ styles.textFamily, { color: colors.pink }]}> Mot de passe</Text>
                    <TextInput
                        style={styles.inputStyle}
                        secureTextEntry={!showPassword}
                        placeholder={'Entrer le mot de passe'}
                        placeholderTextColor={colors.white}
                        selectionColor={colors.white}

                        onChangeText={(userPassword) => setPassword(userPassword)}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 15,
                            bottom: 5,
                            height: 30,
                            width: 30
                        }}
                        onPress={()=> setShowPassword(!showPassword)}
                    >
                        <Ionicons name={showPassword ? 'ios-eye-off': 'ios-eye'} size={24} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>

         </ScrollView>
         <View style={{ position: 'absolute', bottom: 20, right: 20, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.continueAccount} onPress={()=> registerHandle(firstName, lastName, telephone, adresse, email, personneContacter,
                selectedValue, password) } >
              <Ionicons name="ios-checkmark-done-outline" size={24} color={colors.darkBg} />
            </TouchableOpacity>
        </View>
          {renderAreaCodesModal()}
      </View>
  );
}

export default SignupScreen

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.darkBg
      },
    inputStyle: {
        borderBottomColor: colors.pink,
        borderBottomWidth: 1,
        height: 40,
        color: colors.white,
        opacity: .7,
        fontFamily: 'Oswald-ExtraLight'
    },
    textFamily: {
          fontFamily:  'Oswald-Light',
        fontSize: 15,
        marginHorizontal: -1,
    },
      input: {
        marginTop: 20,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.orange,
        borderRadius: 15,
        paddingHorizontal: 16,
        color: colors.white,
        fontWeight: '600',
        padding: 10,
      },
      continueAccount: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        backgroundColor: colors.pink,
        alignItems: 'center',
        justifyContent: 'center',
       
      },
      txtAccount: {
        color: colors.white,
        marginTop: 10,
      },
      closeContainer: {
        marginTop: 2,
        padding: 20,
      },
      RegisterContainer: {
        position: 'absolute',
        right: 35,
        bottom: 20,
        height: 70,
        width: 70,
        borderRadius: 70 / 2,
        borderBottomRightRadius: 80,
        backgroundColor: colors.orange,
        alignItems: 'center',
        justifyContent: 'center',
      },
      close: {
        position: 'absolute',
        left: 10,
        top: 25,
        height: 25,
        width: 25,
        borderRadius: 25 / 2,
        backgroundColor: colors.textSec,
        alignItems: 'center',
        justifyContent: 'center',
      },
      account: {
        fontFamily: 'Oswald-Medium',
        color: colors.textSec,
        marginTop: 10,
        marginLeft: 10,
        fontSize: 35,
        
      }
})