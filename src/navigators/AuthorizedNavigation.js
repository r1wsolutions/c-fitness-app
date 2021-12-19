import React from 'react'
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import {View, Text, Button, Dimensions} from 'react-native'
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'

import LogPage from '../screens/LogPage/LogPage'
import Dashboard from '../screens/Dashboard/Dashboard';
import NavBtn from '../components/nav-btn/NavBtn';

const ContentComponent = (props) => {

    const onNavHandler = (route) => {
        props.navigation.navigate(route)
    }

    return (
    <View 
        style={{
            width:'100%',
            justifyContent:'flex-start',
            alignItems:'center',
            marginTop: Dimensions.get('window').height * .05
        }}
    >
        <View
            style={{
                backgroundColor:'orange',
                width:'30%',
                height:'25%',
                justifyContent:'center',
                alignItems:'center',
                marginBottom: Dimensions.get('screen').height * .02
            }}
        >
            <Text style={{textAlign:'center'}}>CADENCE FITNESS</Text>
        </View>
        <NavBtn 
            title='Log'
            onClick={onNavHandler}
            iconName='pencil-plus-outline'
        />
        <NavBtn 
            title='Dashboard'
            onClick={onNavHandler}
            iconName='tablet-dashboard'
        />
    </View>)
}

const screens = {
    Log:{
        screen: LogPage,
        navigationOptions:{
            headerTitle:'log a set',
            headerStyle:{
                backgroundColor:'black'
            },
            headerTitleStyle:{
                color:'white',
                textAlign:'right'
            }
        }
    },
    Dashboard:{
        screen:Dashboard
    }
}

const drawerNav = createDrawerNavigator(screens, {
    drawerBackgroundColor:'rgb(240, 240, 240)',
    contentComponent: ContentComponent
});


export default gestureHandlerRootHOC(createAppContainer(drawerNav))