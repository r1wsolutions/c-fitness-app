import React from 'react'
import { useSelector } from 'react-redux';
import InitialNavigator from './InitialNavigator';
import AuthorizedNavigation from './AuthorizedNavigation';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';
import {View,Text,StyleSheet} from 'react-native'

const CustomHeader = (props) => {
    return(
        <View
            style={styles.wrapper}
        >
            <View
                style={styles.statusBar}
            >
            
            </View>

            <View
                style={styles.header}
            >
            <Text style={{color:'white'}}>TITLE</Text>
                
            </View>

            <View
                style={styles.body}
            >
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'column',
        justifyContent:'flex-start',
        width:'100%',
        height:'100%'
    },
    statusBar:{
        height:'5%',
        width:'100%',
        backgroundColor:'white'
    },
    header:{
        height:'5%',
        width:'100%',
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    body:{
        height:'90%',
        width:'100%',
        backgroundColor:'purple'
    }
})


const NavHoc = () =>{

    const token = useSelector((state) => state.authReducer.authToken)
    const closeNavBar = useSelector((state)=>state.navBarReducer.closed)
    return(
    <>
        {token.length < 1 &&  <InitialNavigator /> }
        {token.length > 0 && 
            <SelectProvider>
                <CustomHeader>
                    {<AuthorizedNavigation />}
                </CustomHeader>
            </SelectProvider>}
    </>
    )
}

export default NavHoc
