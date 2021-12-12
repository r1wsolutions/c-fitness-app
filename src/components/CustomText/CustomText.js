import React from 'react'
import {Text, StyleSheet} from 'react-native'
import * as Font from 'expo-font'

import { useState, useEffect } from 'react'



const CustomText = (props) =>{
   
    const [fontLoaded, setFontLoaded] = useState(false)

    useEffect(()=>{
        const fetchFonts = async () =>{

            try {
             
                await Font.loadAsync({
                    'Graduate-Regular': require('../../../assets/fonts/Graduate-Regular.ttf')
                })
                    .then((res)=>{
                        setFontLoaded(true)
                    })
                    .catch((err)=>{
                        throw err
                    })
    

            } catch (error) {
                console.log(error)
            }
        }

        fetchFonts() 
    },[])
 
     return(
        <>
        {fontLoaded ? <Text
            style={customFontStyle(props).customFont}
        >
            {props.info}
        </Text> : <Text>{props.info}</Text>}
        </>
    )
}

const customFontStyle = (props) => StyleSheet.create({
    customFont:{
        color: props.color ? props.color : 'black',
        fontFamily: 'Graduate-Regular',
        fontSize: props.size ? props.size : 14,
        textShadowColor: props.shadow ? props.shadow : 0,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius:4
    }
})

export default CustomText

