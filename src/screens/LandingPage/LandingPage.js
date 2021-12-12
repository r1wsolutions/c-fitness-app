import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { View,Image, StyleSheet,Alert,Pressable, TextInput, ActivityIndicator } from 'react-native'
import {signinAction} from '../../store/authActions'
import CustomText from '../../components/CustomText/CustomText'
import splashImage from  '../../../assets/images/splash_01.jpg'


const LandingPage = (props) =>{

    const passwordInpRef = useRef()
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [emailIsValid,setEmailIsValid] = useState(false)
    const [emailInpStart,setEmailInpStart] = useState(false)
    const [password,setPassword] = useState('')
    const [passwordInpStarted,setPasswordInpStarted] = useState(false)
    const [passwordIsValid,setPasswordIsVald] = useState(false)
    const [requestSubmitted,setRequestSubmitted] = useState(false)



    const emailInpHandler =(txt) =>{

        const text = txt.trim()
        
        if(text.length < 1 || !text.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
        {
            setEmailIsValid(false)
        }else{
            setEmailIsValid(true)
        }

        setEmail(text)
    }

    const emailBlurHandler = () =>{
        setEmailInpStart(true)
    }

    const passwordInpHandler =(txt) =>{
        const pw = txt.trim()

        if(pw.length < 4)
        {
            setPasswordIsVald(false)
        }else{
            setPasswordIsVald(true)
        }

        setPassword(pw)
    }
    
    const passwordBlurHandler = () =>{
        setPasswordInpStarted(true)
    }

    const onNavigateHanlder = (route) =>{
        props.navigation.navigate(route)
    }

    const signInHanlder = () =>{
        if(!emailIsValid || !passwordIsValid)
        {
            const alert = {
                title:"Incomplete sign in credentials",
                details:"Must enter a valid username & password"
            }
            signInAlertHandler(alert)
            return
        } 


        setRequestSubmitted(true)//similar to loading...
        dispatch(signinAction(email, password))
            .then((res)=>{
            })
            .catch((err)=>{
                setTimeout(()=>{
                    setRequestSubmitted(false)
                },2000)
                signInAlertHandler({title:'ERROR',details:err.message})
            }) 
              
    }

    const signInAlertHandler = (messages) => {
        return  Alert.alert(
            
            messages.title,
            messages.details,
            [
                // {
                //     text: "Cancel",
                //     onPress: () => console.log("Cancel Pressed"),
                //     style: "cancel"
                // },
                { 
                    text: "OK"
                }
            ]
        )
    }
    
    if(requestSubmitted)
    {
        return  <View style={landingPageStyle.centered}>
                    <ActivityIndicator
                        size='large'
                        color={landingPageStyle.register.backgroundColor}
                    />
                </View>
    }
    
    return (
        <View
            style={landingPageStyle.wrapper}
        >
            <View style={landingPageStyle.topHalf}>
                <View style={landingPageStyle.textView}>
                    <CustomText 
                        color='white'
                        info='track your progress'
                    />
                    
                </View> 
                <Image
                    style={landingPageStyle.image}
                    source={splashImage}
                />
            </View>

            <View style={landingPageStyle.bottomHalf}>
                    <View style={landingPageStyle.signinForm}>
                        <TextInput
                            style={landingPageStyle.inp} 
                            value={email}
                            placeholder='EMAIL'
                            onChangeText={emailInpHandler}
                            onBlur={emailBlurHandler}
                            keyboardType='email-address'
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                passwordInpRef.current.focus();
                            }}
                            blurOnSubmit={false}
                           
                        />
                        {
                            !emailIsValid && emailInpStart && <CustomText color='white' info='please enter a valid email' />
                        }
                        <TextInput 
                            style={landingPageStyle.inp}
                            value={password}
                            placeholder='PASSWORD'
                            onChangeText={passwordInpHandler}
                            onBlur={passwordBlurHandler}
                            secureTextEntry={true}
                            ref={passwordInpRef}
                            //returnKeyType="next"
                            onSubmitEditing={signInHanlder}
                        />
                        {
                            !passwordIsValid && passwordInpStarted && <CustomText color='white' info='please enter a valid password' />
                        }
                    </View>

                    <View style={landingPageStyle.existingUsers}>
                        {!requestSubmitted && <Pressable 
                            style={[landingPageStyle.press]}
                            //disabled={!emailIsValid || !passwordIsValid}
                            onPress={signInHanlder}
                        >
                                <CustomText 
                                    info='sign-in'
                                    color='white'
                                    size={20}
                                />
                        </Pressable>}
                    </View>

                    <View style={landingPageStyle.register}>
                        <Pressable 
                            style={landingPageStyle.press}
                            onPress={()=>{onNavigateHanlder('AuthPage')}}
                        >
                                <CustomText 
                                    info='join now'
                                    color='white'
                                    size={20}
                                />
                        </Pressable>
                    </View>
            </View>
        </View>
    )
}

const landingPageStyle = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    wrapper:{
        width:'100%',
        height:'100%',
        position:'absolute',
        backgroundColor:'black',
        top:0,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    topHalf:{
        width:'100%',
        height:'30%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    textView:{
        position:'absolute',
        zIndex: 10,
        top:'40%',
        left: '10%'
    },
    image:{
        width:'100%',
        height:'100%',
        top:0
    },
    press:{
        width:'100%',
        textAlign:'center',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    bottomHalf:{
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'space-evenly',
        width:'100%',
        height:'70%'
    },
    signinForm:{
        width:'80%',
        height:'50%',
        borderRadius:10,
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'column',
        backgroundColor:'rgba(245, 245, 245,.7)',
        borderColor:'white',
        borderWidth:2
    },
    inp:{
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:1,
        textAlign:'center',
        width:'90%',
        height:'20%',
        fontSize:18
    },
    existingUsers:{
        borderColor:'white',
        borderWidth:2,
        borderRadius:4,
        width:'80%',
        height:'10%',
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'rgb(225, 225, 225)'
    },
    register:{
        backgroundColor:'rgb(8, 185, 255)',
        borderRadius:4,
        width:'80%',
        height:'10%',
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'center'
    }
})

export default LandingPage