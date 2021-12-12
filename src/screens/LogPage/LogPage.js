import React,{ useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Select } from '@mobile-reality/react-native-select-pro';
import CustomText from '../../components/CustomText/CustomText';
import { useSelector, useDispatch } from 'react-redux'

import {customWoListReducerSliceActions} from '../../store/customWoListReducerSlice'

const LogPage = () =>{

    const uid = useSelector((state) => state.authReducer.uid)
    const token = useSelector((state) => state.authReducer.authToken)
    const rawExerciseNames = useSelector((state) => state.customWoListReducer.customWorkouts)
    const [exerciseNames,setExerciseNames] = useState([])
    const [exercise,setExercise] = useState('')
    const [reps,setReps] = useState(0)

    useEffect(()=>{
        const tempArr = []

        rawExerciseNames.forEach((ex)=>{
            tempArr.push({ value: ex.name, label: ex.name})
        })

        setExerciseNames(tempArr)

    },[rawExerciseNames])

    const withoutTime = (dateTime) => {
        var date = new Date(dateTime.getTime());
        date.setHours(0, 0, 0, 0);
      
        return date;
    }

    const optionsSelectHandler = (opt) =>{
        if(opt)
        {
            setExercise(opt.label)
            return
        }
        
        setExercise('')
    }

    const updateRepsHandler = (reps) =>{
        const tReps = parseInt(reps)

        if(tReps < 1)
        {
            console.log('enter a number greater than 1')
            return
        }

        setReps(tReps)
    }

    const onSubmitHanlder = async () =>{
        if(exercise.length < 1)
        {
            console.log('no exercise selected')
            return
        }
        
        if(reps < 1)
        {
            console.log('at least do one rep, you can do this!')
            return
        }

        const date = withoutTime(new Date(Date.now()))
        
        const wo = {
            exercise: exercise,
            amount: reps.toString(),
            timestampe: new Date(Date.now())
        }
        
        try {
            const postRequest = await fetch(`https://cadence-fitness-default-rtdb.firebaseio.com/${uid}/workouts/${date.getFullYear()}/${date.getMonth()}/${date}/${exercise}/.json?auth=${token}`,{
                method: "POST",
                body: JSON.stringify(wo)
            })

            const postResponse = await postRequest.json()

            console.log(postResponse)
        } catch (error) {
            console.log(error)
        }

        console.log(wo)
    }

    return(
        <View style={logPageStyles.wrapper}>
            {/* <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={logPageStyles.background}
            /> */}
            <View style={logPageStyles.form}>
                <Text style={logPageStyles.font}>{`log a set`}</Text>
                <Select
                    selectControlStyle={logPageStyles.select}
                    options={exerciseNames} 
                    onSelect={optionsSelectHandler}
                />
                <TextInput
                    style={logPageStyles.inp}
                    placeholder='reps completed'
                    keyboardType='number-pad'
                    onChangeText={updateRepsHandler}
                />
                <Pressable
                    style={logPageStyles.btn}
                    onPress={onSubmitHanlder}
                >
                    <CustomText info='sumbit' color='white' size={20} />
                </Pressable>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgb(0, 58, 116)', 'rgb(0, 127, 255)']}
                    style={logPageStyles.formBackground}
                />
            </View>
        </View>
    )
}

const logPageStyles = StyleSheet.create({
    wrapper:{
        width:Dimensions.get('window').width,
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgb(223, 223, 223)'
    },
    font:{
        fontSize:30,
        color:'white'
    },
    form:{
        width:'95%',
        height:'95%',
        display:'flex',
        flexDirection:'column',
        justifyContent: 'space-evenly',
        alignItems:'center',
        borderRadius:14,
        borderColor: 'white',
        borderWidth: 2
    },
    select:{
        width:Dimensions.get('window').width *.75,
        height: Dimensions.get('window').height *.08
    },
    inp:{
        backgroundColor:'white',
        width: Dimensions.get('window').width *.75,
        height:Dimensions.get('window').height *.08,
        textAlign:'center',
        borderRadius:4,
        borderColor:'black',
        borderWidth:1
    },
    btn:{
        width: Dimensions.get('window').width *.75,
        height: '10%',
        backgroundColor: 'rgb(40, 233, 169)',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'center'
    },
    formBackground:{
        position:'absolute',
        top:0,
        zIndex:-1,
        width: '100%',
        height: '100%',
        borderRadius:12
    },
    background:{
        position:'absolute',
        top:0,
        zIndex:-1,
        width: '100%',
        height: '100%'
    }
})

export default LogPage