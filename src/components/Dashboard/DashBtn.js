import React from "react";
import {Pressable,Text,StyleSheet} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const DashBtn = (props) =>{
    return(
        <Pressable 
            style={styles.btn}
            onPress={props.onClick}
        >
            <MaterialCommunityIcons name={props.iconName} size={24} color="gray" />
            <Text>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn:{
        width:'45%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fd8f3b'
    },
})

export default DashBtn