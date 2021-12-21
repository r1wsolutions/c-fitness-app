import React from 'react'
import {View,ScrollView, Pressable, Text, SafeAreaView, StyleSheet} from 'react-native'

const DayDetails = (props) =>{
    return (
    <SafeAreaView
        style={styles.wrapper}
    >
        <View
            style={styles.scroll}
        >
            <View
                style={styles.subHeader}
            >
                <View
                    style={styles.title}
                >
                    <Text>Summary</Text>
                </View>
                <Pressable
                    style={styles.closeBtn}
                    onPress={()=>{
                        props.navigation.navigate('Dashboard')
                    }}
                >
                    <Text
                        style={styles.ex}
                    >
                        X
                    </Text>
                </Pressable>
            </View>
            
        </View>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        height:'100%',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:'black'    
    },
    scroll:{
        width:'95%',
        height:'95%',
        borderRadius:24,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white'
    },
    subHeader:{
        width:'100%',
        height:'5%',
        borderTopRightRadius:24,
        borderTopLeftRadius:24,
        flexDirection:'row',
        justifyContent:'flex-start',
        borderBottomWidth:1,
        borderBottomColor:'black',
        backgroundColor:'rgb(245,245,245)'
    },
    title:{
        width:'80%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:24
    },
    closeBtn:{
        borderTopRightRadius:24,
        width:'20%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'red'
    },
    ex:{
        fontSize: 24,
        fontWeight:'bold',
        color:'white'
    }   
})

export default DayDetails
