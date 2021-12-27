import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'

const SetDetail = (props) => {

    return (<View
                style={styles.wrapper}
            >
        <View
            style={styles.detail}
        >
            <Text style={styles.txt}>reps: {props.reps}</Text>
        </View>
        <View style={styles.divider}></View>
        <View
            style={styles.detail}
        >
            <Text style={styles.txt}>time: {props.time}</Text>
        </View>
    </View>)

}

const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        height:Dimensions.get('window').height * .1,
        flexDirection:'row',
        marginVertical: 1,
        borderColor:'darkgray',
        borderWidth:1,
        backgroundColor:'rgb(245,245,245)',
        backgroundColor:'black',
        borderRadius:12,
        elevation:5        
    },
    divider:{
        height:'100%',
        width:'.09%',
        backgroundColor:'gray'
    },
    detail:{
        width:'49%',
        justifyContent:'center',
        alignItems:'center'
    },
    txt:{
        color:'white'
    }
})

export default SetDetail

