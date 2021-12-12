import { StyleSheet, Dimensions,Platform } from "react-native";
import { Header } from 'react-navigation-stack'

const headerHeight = Header.HEIGHT;
const topMargin = headerHeight
const drawerHeight = Dimensions.get('window').height - headerHeight

const navBarStyle = StyleSheet.create({
    
    navBar: {
        zIndex:5,
        //elevation: (Platform.OS === 'android') ? 5 : 0,
        position:'absolute',
        top:topMargin,
        width: '50%',
        //height: Dimensions.get('window').height - topMargin,
        height: drawerHeight,
        display: 'flex',
        flexDirection:'column',
        margin: 0,
        padding: 0,
        backgroundColor: 'lightgray',
        borderRightWidth: 1,
        borderRightColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.295)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    topHalf:{
        position:'relative',
        height:'90%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:"flex-start",
        alignItems: 'center',
        elevation: 2
    },
    bottomHalf:{
        backgroundColor:'black',
        height:'10%',
        width:'100%',
        margin:0,
        padding:0,
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    btn:{
        height:Dimensions.get('window').height * .06,
        width:'60%',
        fontSize:20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',   
        backgroundColor: '#ff8325',
        borderColor: 'black',
        borderWidth: 1,
        marginTop:'8%'
    },
    logOutBtn: {
        marginTop:'0%',
        backgroundColor:'white',
    }
})

export default navBarStyle