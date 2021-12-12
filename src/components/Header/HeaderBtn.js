import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import {authReducerActions} from '../../store/authReducerSlice'
import {navBarReducerActions} from '../../store/navBarReduceSlice'

let signOutTimer = null


const HeaderBtn = (props) =>{
    
    const dispatch = useDispatch()
    const expireTime = useSelector((state)=>new Date(state.authReducer.autoSignOutTime).getTime())
    if(!signOutTimer)
    {
        signOutTimer = setTimeout(()=>{
            dispatch(authReducerActions.signOut())
        },expireTime - 300000)//five minute buffer
    }

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