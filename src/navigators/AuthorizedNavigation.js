import React from 'react'
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LogPage from '../screens/LogPage/LogPage'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderBtn from "../components/Header/HeaderBtn";


export const MenuButton = ()=> (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
    <Item
        title='menu'
        iconName='menu'
    />
</HeaderButtons>)

const authorizedNavigation = createStackNavigator({
    LogPage:{
        screen: LogPage,
        navigationOptions:{
            headerTitle:'log a set',
            headerStyle:{
                backgroundColor:'black'
            },
            headerTitleStyle:{
                color:'white',
                textAlign:'right'
            },
            headerRight: MenuButton()
        }
    }
})

export default createAppContainer(authorizedNavigation)