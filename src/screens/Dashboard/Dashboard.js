import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'

const Dashboard = () => {
    return (
        <View
            style={styles.wrapper}
        >
            <Text>DASH</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        height: '100%',
        backgroundColor:'gray',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Dashboard