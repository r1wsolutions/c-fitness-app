import React, {useState,useEffect} from 'react'
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import {View, Text, Pressable, Dimensions, StyleSheet, ActivityIndicator} from 'react-native'
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux';
import {authReducerActions} from '../store/authReducerSlice'
import {exerciseCollectionActions} from '../store/exerciseCollectionSlice'
import {getProfileAction} from '../store/authActions'

import LogPage from '../screens/LogPage/LogPage'
import Dashboard from '../screens/Dashboard/Dashboard';
import DayDetails from '../components/DayDetails/DayDetails';
import NavBtn from '../components/nav-btn/NavBtn';



const ContentComponent = (props) => {

    const uid = useSelector((state) => state.authReducer.uid)
    const token = useSelector((state) => state.authReducer.authToken)
    const profile = useSelector((state) => state.authReducer.profile)
    const dispatch = useDispatch()
    const [loadingProfile, setLoadingProfile] = useState(true)

    useEffect(()=>{
        
        const getProfileHandler = async () =>{
            dispatch(getProfileAction(uid,token))
                .then(()=>{
                    setLoadingProfile(false)
                })
        }

        if(profile === null){
            getProfileHandler()
            return
        }

        setLoadingProfile(false)

    },[token,uid,profile])

    const onNavHandler = (route) => {
        props.navigation.navigate(route)
    }

    return (
    <View 
        style={styles.wrapper}
    >
        <View
            style={styles.top}
        >
            <View
                style={styles.usernameWrapper}
            >
                {loadingProfile ? 
                    <View
                        style={{
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                        <ActivityIndicator 
                            size='large'
                            color='teal'
                        />
                    </View>
                : 
                <View
                    style={styles.username}
                >
                    <Text style={{fontWeight:'bold',fontSize:18}}>CADENCE FITNESS</Text>
                    <Text style={{fontSize:16}}>{`${profile.fName}`}</Text>
                </View>}
            </View>
        </View>
        
        <View
            style={styles.center}
        >
            <NavBtn 
                title='Log'
                onClick={onNavHandler}
                iconName='pencil-plus-outline'
            />
            <NavBtn 
                title='Dashboard'
                onClick={onNavHandler}
                iconName='tablet-dashboard'
            />
        </View>

        <View>
            <Pressable
                onPress={()=>{
                    dispatch(exerciseCollectionActions.clearAll())
                    dispatch(authReducerActions.signOut())
                }}
            >
                <Text>LOGOUT</Text>
            </Pressable>
        </View>
    </View>)
}

const screens = {
    Log:{
        screen: LogPage,
        navigationOptions:{
            headerTitle:'log a set',
            headerStyle:{
                backgroundColor:'black'
            },
            headerTitleStyle:{
                color:'white',
                textAlign:'right'
            }
        }
    },
    Dashboard:{
        screen:Dashboard
    },
    DayDetails:{
        screen:DayDetails
    }
}

const drawerNav = createDrawerNavigator(screens, {
    drawerBackgroundColor:'rgb(240, 240, 240)',
    contentComponent: ContentComponent
});

const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop: Dimensions.get('window').height * .05
    },
    top:{
        width:'100%',
        height:'25%',
        justifyContent:'center',
        alignItems:'center'
    },
    usernameWrapper: { 
        backgroundColor:'#ff9d52',
        width:'100%',
        height:'50%',
        flexDirection:'row', 
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom: Dimensions.get('screen').height * .02,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'black'
    },
    username:{
        marginLeft:'5%'
    },
    center:{
        width:'100%',
        height:'50%',
        justifyContent:'flex-start',
        alignItems:'center'
    }
})

export default gestureHandlerRootHOC(createAppContainer(drawerNav))