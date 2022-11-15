import {Dimensions, StyleSheet} from 'react-native'

export const getWidhtDrawer = () => {
    let drawerWidth = Dimensions.get("window").width * 0.85

    return drawerWidth;
}
export const getWidth = () => {
    let width = Dimensions.get("window").width

    // Horizontal Padding = 20...
    width = width - 80;

    // Total five Tabs...
    return width / 5;
}

export const colors = {
    darkBg: "#222",
    lightBg: "#333",
    darkHl: "#666",
    lightHl: "#888",
    pink: "#ea3372",
    text: "#fff",
    textSec: "#aaa",
    orangeLg: "#ffa500",
    orange: "#f97878",
    white: "#fff",
    dark: "#000",
    jauneHl: "#f5ba57",
    tomato: 'tomato',
    greenHL: '#34ffb9',
    grayBg: '#414448',
    primary: '#F9813A',
    secondary: '#fedac5',
    light: '#E5E5E5',
    grey: '#908e8c',


};



export const gs = StyleSheet.create({
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
     rowBetween: {
         flexDirection: "row",
         justifyContent: "space-between"
     },
     center: {
         alignItems: 'center',
         justifyContent: 'center'
     },
     sectionContainer: {
         paddingVertical: 24,
         paddingHorizontal: 32,
         marginBottom: 8,
         backgroundColor: colors.lightBg
     },
     sectionTitle: {
         fontWeight: "700",
         color: colors.text,
         fontSize: 15
     },
     divider: {
         borderBottomColor: "#444",
         borderBottomWidth: 1,
         marginVertical: 24
     },
     title: {
         color: colors.text,
         fontSize: 30,
         fontFamily: 'Oswald-Bold'
     },
     smallTitle: {
         fontWeight: "800",
        color: colors.text,
        fontSize: 20
    },
     subTitle: {
         fontWeight: "600",
         color: "rgba(255,255,255,0.6) ",
         fontSize: 15,
         letterSpacing: 1,

     },
     smallText: {
         fontSize: 12,
         fontWeight: "800",
         color: colors.text
     },
     absoluteFull: {
         position: "absolute",
         top: 0,
         left: 0,
         width: "100%",
         height: "100%"
     },
     button: {
         justifyContent: "center",
         alignItems: "center",
         backgroundColor: colors.pink,
         borderRadius: 100
     }
})