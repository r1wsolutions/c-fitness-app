import React from 'react';
import { View, Pressable, Animated,Easing } from 'react-native';
import CustomText from '../CustomText/CustomText';
import { useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux';
import {authReducerActions} from '../../store/authReducerSlice'
import {navBarReducerActions} from '../../store/navBarReduceSlice'
import styles from './NavBarStyle'
 
const NavBar =() =>{

    const dispatch = useDispatch()
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const slideAnim = useRef(new Animated.Value(-225)).current  // Initial value for left pos: 0
    
    useEffect(() => {

        Animated.parallel([
            Animated.timing(
                slideAnim,
                {
                    toValue: 0,
                    duration: 350,
                    easing: Easing.linear, // Easing is an additional import from react-native
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                fadeAnim, 
                {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true 
                }
            )
        ]).start()
      
    }, [fadeAnim, slideAnim])

    const onSignoutHandler = () =>{
        dispatch(authReducerActions.signOut())
        dispatch(navBarReducerActions.toggleClose())
    }
    
    return (
        <Animated.View style={
            [
                styles.navBar,
                {
                    opacity:fadeAnim,
                    transform: [{ translateX: slideAnim }]
                }
            ]}>
            <View style={styles.topHalf}>

                <Pressable style={styles.btn}>
                    <CustomText 
                        info='log'
                    />
                    
                </Pressable>
                
                <Pressable style={styles.btn}>
                    <CustomText 
                        info='dashboard'
                    />
                </Pressable>

                <Pressable 
                    style={styles.btn}
                    onPress={()=>{console.log('stats')}}
                >
                    <CustomText 
                        info='stats'
                    />
                </Pressable>
            </View>
            <View style={styles.bottomHalf}>
                <Pressable 
                    style={[styles.btn,styles.logOutBtn]}
                    onPress={onSignoutHandler}
                    accessible={true}
                >
                    <CustomText 
                        info='logout'
                    />
                </Pressable>
            </View>
        </Animated.View>
    )
}



export default NavBar