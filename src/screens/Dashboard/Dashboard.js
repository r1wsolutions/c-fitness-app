import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DashBtn from '../../components/Dashboard/DashBtn'

const Dashboard = () => {
    return (
        <View
            style={styles.wrapper}
        >
           
            <View
                style={styles.top}
            >
                <Text>DASH</Text>
            </View>
            <View
                style={styles.bottom}
            >
                <DashBtn
                    title='list'
                    iconName='clipboard-list-outline'
                />   
                <View style={styles.divider}>
                    <View style={styles.line}></View>
                </View>
                <DashBtn
                    title='custom'
                    iconName='graph'
                /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        height: '100%',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'flex-start'

    },
    top:{
        backgroundColor: 'orange',
        width:'100%',
        height:'90%'
    },
    bottom:{
        height:'10%',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        
        borderTopColor:'gray',
        borderTopWidth:1,
    },
    divider:{
        width:'10%',
        height:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    line:{
        height:'95%',
        width:'1%',
        backgroundColor:'gray'
    }
})

export default Dashboard