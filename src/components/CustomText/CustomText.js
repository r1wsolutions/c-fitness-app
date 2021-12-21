import React  from 'react'
import {Text,StyleSheet} from 'react-native'

import { useFonts,Graduate_400Regular} from '@expo-google-fonts/graduate'
 
const CustomText = (props) =>{
   
    //const [fontLoaded, setFontLoaded] = useState(false)
    const [fontLoaded] = useFonts({
        Graduate_400Regular
    })

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
        fontFamily: 'Graduate_400Regular',
        fontSize: props.size ? props.size : 14,
        textShadowColor: props.shadow ? props.shadow : 0,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius:4
    }
})

export default CustomText

