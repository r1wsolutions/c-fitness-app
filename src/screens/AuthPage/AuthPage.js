import React,{useState,useRef} from 'react'
import {StyleSheet, View, TextInput, Dimensions, Pressable, ActivityIndicator, Alert } from 'react-native'
import { useDispatch } from 'react-redux';
import {registerAction,createProfileAction,signinAction} from '../../store/authActions'
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from '../../components/CustomText/CustomText';

const AuthPage = (props) =>{

    const [firstName,setFirstName] = useState('')
    const [firstNameValid,setFirstNameValid] = useState(false)
    const [firstNameEntered,setFirstNameEntered] = useState(false)

    const [lastName,setLastName] = useState('')
    const [lastNameValid,setLastNameValid] = useState(false)
    const [lastNameEntered,setLastNameEntered] = useState(false)
    const lastNameRef = useRef()
    
    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [emailEntered, setEmailEntered] = useState(false)
    const emailRef = useRef()

    const [password,setPassword] = useState('')
    const [passwordValid,setPasswordValid] = useState(false)
    const [passwordEntered,setPasswordEntered] = useState(false)
    const passwordRef = useRef()

    const [confirmedPW, setConfirmedPW] = useState('')
    const [confirmedPWValid, setConfirmedPWValid] = useState(false)
    const [confirmedPWEntered, setConfirmedPWEntered] = useState(false)
    const confirmedPWRef = useRef()

    const submitBtnRef = useRef()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const updateFirstNameHandler = (val) =>{

        const text = val.trim()

        setFirstName(text)

        if(!firstNameValid && text.length > 0)
        {
            setFirstNameValid(true)
        }

        if(text.length > 0 && firstNameEntered)
        {
            setFirstNameEntered(false)
        }

        if(text.length < 1)
        {
            setFirstNameEntered(true)
            setFirstNameValid(false)
        }
    }

    const firstNameBurHandler = () =>{
        if(firstName.length < 1) setFirstNameEntered(true)
    }

    const updateLastNameHandler = (val) =>{

        const text = val.trim()

        setLastName(text)

        if(!lastNameValid && text.length > 0)
        {
            setLastNameValid(true)
        }

        if(text.length > 0 && lastNameEntered)
        {
            setLastNameEntered(false)
        }

        if(text.length < 1)
        {
            setLastNameEntered(true)
            setLastNameValid(false)
        }
    }

    const lastNameBurHandler = () =>{
        if(lastName.length < 1) setLastNameEntered(true)
    }

    const updateEmailHandler = (val) =>{
        
        const text = val.trim()
        
        setEmail(text)

        if(!emailValid && text.length > 0)
        {
            setEmailValid(true)
        }

        if(text.length > 0 && emailEntered)
        {
            setEmailEntered(false)
        }

        if(text.length < 1 || !text.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
        {
            setEmailEntered(true)
            setEmailValid(false)
        }
        
    }

    const emailBurHandler = () =>{
        if(email.length < 1) setEmailEntered(true)
    }

    const updatePasswordHandler = (val) =>{
        
        const text = val.trim()
        
        setPassword(text)

        if(!passwordValid && text.length > 0)
        {
            setPasswordValid(true)
        }

        if(text.length > 0 && passwordEntered)
        {
            setPasswordEntered(false)
        }

        if(text.length < 1)
        {
            setPasswordEntered(true)
            setPasswordValid(false)
        }
    }

    const passwordBurHandler = () =>{
        if(password.length < 1) setPasswordEntered(true)
    }

    const updateConfirmPasswordHandler = (val) =>{

        const text = val.trim()

        setConfirmedPW(text)

        if(!confirmedPWValid && text.length > 0)
        {
            setConfirmedPWValid(true)
        }

        if(text.length > 0 && confirmedPWEntered)
        {
            setConfirmedPWEntered(false)
        }

        if(text.length < 1 || text !== password)
        {
            setConfirmedPWEntered(true)
            setConfirmedPWValid(false)
        }
    }

    const confirmPasswordBurHandler = () =>{
        if(confirmedPW.length < 1) setConfirmedPWEntered(true)
    }

    const popNavigateHanlder = (route) =>{
        props.navigation.pop()
    }

    const onSubmitHandler = async () =>{
        
        let foundError = false

        if(!firstNameValid)  
        {
            foundError = true
            setFirstNameEntered(true)
        }

        if(!lastNameValid)
        {
            foundError = true
            setLastNameEntered(true)
        }

        if(!emailValid)
        {
            foundError = true
            setEmailEntered(true)
        }

        if(!passwordValid)
        {
            foundError = true
            setPasswordEntered(true)
        }

        if(!confirmedPWValid)
        {
            foundError = true
            setConfirmedPWEntered(true)
        }

        if(foundError) {
            return
        }else{

            try {    
                setIsLoading(true)
                dispatch(registerAction({
                        email: email, 
                        password: password,
                        firstName: firstName,
                        lastName: lastName
                    })
                ) 

                setTimeout(()=>{
                    setIsLoading(false)
                    popNavigateHanlder()
                },2000)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
    }

    return (<View style={styles.wrapper}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                    style={styles.background}
                />
    
                <View style={styles.top}>
                    <View
                        style={styles.form}
                    >
                        <View style={styles.names}>
                            <TextInput
                                style={[styles.inp,{width:'45%'},firstNameEntered & !firstNameValid && styles.onError]}
                                placeholder='First'
                                onChangeText={updateFirstNameHandler}
                                onBlur={firstNameBurHandler}
                                onSubmitEditing={()=>{lastNameRef.current.focus()}}
                            />
                            <TextInput
                                style={[styles.inp,{width:'45%'},lastNameEntered && !lastNameValid && styles.onError]}
                                placeholder='Last'
                                onChangeText={updateLastNameHandler}
                                onBlur={lastNameBurHandler}
                                ref={lastNameRef}
                                onSubmitEditing={()=>{emailRef.current.focus()}}
                            />
                        </View>
                        
                        <TextInput
                            style={[styles.inp, emailEntered && !emailValid && styles.onError]}
                            placeholder='Email'
                            onChangeText={updateEmailHandler}
                            onBlur={emailBurHandler}
                            ref={emailRef}
                            onSubmitEditing={()=>{passwordRef.current.focus()}}
                            keyboardType='email-address'
                        />
                        <TextInput
                            style={[styles.inp,passwordEntered & !passwordValid && styles.onError]}
                            placeholder='Password'
                            onChangeText={updatePasswordHandler}
                            onBlur={passwordBurHandler}
                            ref={passwordRef}
                            onSubmitEditing={()=>{confirmedPWRef.current.focus()}}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={[styles.inp,confirmedPWEntered & !confirmedPWValid && styles.onError]}
                            placeholder='Confirm Password'
                            onChangeText={(val)=>{
                                if(!isLoading)
                                {
                                    updateConfirmPasswordHandler(val)
                                }
                            }}
                            onBlur={()=>{
                                if(!isLoading)
                                {
                                    confirmPasswordBurHandler()
                                }
                            }}
                            ref={confirmedPWRef}
                            onSubmitEditing={()=>{
                                if(!isLoading)
                                {
                                    //submitBtnRef.current.focus()
                                    onSubmitHandler()
                                }
                            }}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={styles.bottom}>
                    <Pressable
                        style={styles.submitBtn}
                        onPress={onSubmitHandler}
                        ref={submitBtnRef}
                        disabled={isLoading}
                    >
                        <CustomText 
                            info='submit'
                            color='white'
                            size={18}
                        />        
                    </Pressable> 
                    {isLoading && <ActivityIndicator 
                        size='large'
                        color='orange'    
                    />}
                </View>
            </View>)
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor: 'radial-gradient(circle at center left ,#222, black 110%) no-repeat',
        width: '100%',
        height: '100%'
    },
    loader:{
        width:'90%',
        height:'90%',
        elevation:5,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center'
    }
    ,
    top:{
        position:'absolute',
        top:0,
        height:'70%',
        width:'95%',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    form:{
        backgroundColor:'white',
        width:'100%',
        height:'90%',
        borderColor:'black',
        borderWidth:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    names:{
        width:'95%',
        height:'10%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:"flex-end"
    },
    inp:{
        width:'90%',
        height: Dimensions.get('window').height * .08,
        fontSize:18,
        borderBottomColor:'orange',
        borderBottomWidth:1
    },
    onError:{
        borderColor:'red',
        borderBottomColor:'red',
        borderBottomWidth:2,
        borderWidth:2,
    },
    bottom:{
        position:'absolute',
        bottom:0,
        height:'30%',
        width:'95%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    submitBtn:{
        backgroundColor:'rgb(27, 236, 167)',
        width:'80%',
        height:'30%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'white',
        borderWidth:2
    }, 
    background:{
        position:'absolute',
        top:0,
        zIndex:-1,
        width: '100%',
        height: '100%'
    }
})

export default AuthPage