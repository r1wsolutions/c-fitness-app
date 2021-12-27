import React from 'react'
import { View,Text, StyleSheet, Dimensions } from 'react-native'

const WoIcon = (props) => {


    //TODO - Use a gradient as the back, sphere dark center fade out
    return (
        <View
            style={[styles.iconWrapper, props.active ? styles.active : styles.inActive]}
        >
            <Text>{props.sets}</Text>
            <Text
                style={styles.btmTxt}
            >
                {props.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    iconWrapper:{
        // borderColor:'black',
        // borderWidth:1,
        // borderRadius:8,
        height:Dimensions.get('window').height / 8,
        width:Dimensions.get('window').width / 3.5,
        margin:2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(245,245,245)'
    },
    topTxt:{

    },
    btmTxt:{
        fontWeight:'bold',
        fontSize:14
    },
    inActive:{
        borderColor:'black',
        borderWidth:2
    },
    active:{
        borderColor:'#fd9647',
        borderWidth:2
    }
})

export default WoIcon