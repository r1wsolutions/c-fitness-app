import React from "react";
import {View, Pressable,Text,Dimensions} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NavBtn = (props) => {
    return(
        <Pressable
            style={{
                //backgroundColor:'blue',
                width:'90%',
                borderBottomColor:'black',
                borderBottomWidth: 1,
                flexDirection:'row',
                marginBottom:Dimensions.get('window').height * .025
            }}
            onPress={()=>{props.onClick(props.title)}}
        >
            <View
                style={{
                    width:'80%'
                }}
            >
                <Text
                    style={{ 
                        fontSize:20
                    }}
                >
                    {props.title}
                </Text>
            </View>

            <View
                style={{
                    width:'20%',
                    justifyContent:'center',
                    alignItems:'center'
                }}
            >
                <MaterialCommunityIcons name={props.iconName} size={28} color="black" />
            </View>
            
        </Pressable>
    )
}

export default NavBtn