import React from 'react'
import { StyleSheet, Text, View, Animated, useWindowDimensions } from 'react-native'


const Paginator = ({data, scrollX}) => {


    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            
            {data.map((_, i) => {
                return <View style={[styles.dot, { width: 10 }]} key={i.toString()} />
            })}

        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#493d8a',
        marginHorizontal: 8,
    }
})
