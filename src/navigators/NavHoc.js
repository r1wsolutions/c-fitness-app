import React from 'react'
import { useSelector } from 'react-redux';
import InitialNavigator from './InitialNavigator';
import AuthorizedNavigation from './AuthorizedNavigation';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';
import {View,Text,StyleSheet,Dimensions} from 'react-native'

const HeaderHOC = (props) => {

    return(
        <View
            style={styles.wrapper}
        >
            <View
                style={styles.header}
            >
                <Text style={{color:'white'}}>TITLE</Text>       
            </View>

            <View
                style={styles.body}
            >
                {
                    props.children
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        marginTop:'auto',
        width:'100%',
        height:Dimensions.get('window').height,
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:'pink'
    },
    header:{
        height: '6%',
        width:'100%',
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center'
    },
    body:{
        height:'94%',
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
                <HeaderHOC>
                    {<AuthorizedNavigation />}
                </HeaderHOC>
            </SelectProvider>}
    </>
    )
}

export default NavHoc
