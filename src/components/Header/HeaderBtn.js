import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import {navBarReducerActions} from '../../store/navBarReduceSlice'


const HeaderBtn = (props) =>{

    const dispatch = useDispatch()

    const onPressHandler = () =>{
        dispatch(navBarReducerActions.toggleClose())
    }

    return(<HeaderButton
                {...props}
                IconComponent={Ionicons}
                iconSize={23}
                color='white'
                onPress={onPressHandler}
            />)
}

export default HeaderBtn