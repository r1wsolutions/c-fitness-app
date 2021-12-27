import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {retrieveExerciseCollection} from '../../store/exerciseCollectionActions'
import {exerciseCollectionActions} from '../../store/exerciseCollectionSlice'
import {View, Text, Pressable, StyleSheet, FlatList, SafeAreaView, Dimensions, ActivityIndicator} from 'react-native'
import { useFonts,Graduate_400Regular} from '@expo-google-fonts/graduate'

const AllWoList = (props) => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const uid = useSelector((state)=>state.authReducer.uid)
    const token = useSelector((state)=>state.authReducer.authToken)
    const allWorkouts = useSelector((state)=>state.exerciseCollectionReducer.allWorkouts)
    
    const [fontLoaded] = useFonts({
        Graduate_400Regular
    })

    useEffect( async ()=>{
        const getAllWorkouts = async () =>{
            dispatch(retrieveExerciseCollection(uid,token))
        }
        if(allWorkouts.length < 1)
        {
            await getAllWorkouts()
            setIsLoading(false)
        }
        setIsLoading(false)
        
    },[uid,token])

    const loader = <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator 
            color='blue'
            size='large'
        />
    </View>

    const navigateDetailsHanlder = (index,snapshot,date) =>{
        props.onClick('DayDetails',{
            index: index,
            snapshot: snapshot,
            date: date
        })
    }

    const listItem = (wo) => {

        return <Pressable 
                    style={styles.listItem}
                    onPress={()=>{
                        dispatch(exerciseCollectionActions.setDidSetDay({status:false}))
                        navigateDetailsHanlder(wo.item.index,wo.item.daySnapshot,wo.item.date)
                    }}    
                >            
                    <View style={styles.section}
                        ><Text>{wo.item.date}</Text>
                    </View>
                    
                    <View style={styles.section}>
                        <Text style={styles.txtTop}>{wo.item.exercisesPerformed}</Text>
                        <Text style={styles.txtBtm}>exercises</Text>
                    </View>
                    
                    <View style={styles.section}>
                        <Text style={styles.txtTop}>{wo.item.setsCompleted}</Text>
                        <Text style={styles.txtBtm}>sets</Text>
                    </View>
                    
                    <View style={styles.section}>
                        <Text style={styles.txtTop}>{wo.item.repsCompleted}</Text>
                        <Text style={styles.txtBtm}>reps</Text>
                    </View>
                </Pressable>    
    }
    return (
        isLoading ? loader : <SafeAreaView style={styles.wrapper}>
            <Text>All Workouts</Text>
            <FlatList
                style={{height:'100%'}} 
                data={allWorkouts}
                renderItem={listItem}
                keyExtractor={(item,index)=>index} 
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        height:'100%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'rgb(240, 240, 240)'        
    },
    listItem:{
        flex:1,
        width:'100%',
        height:Dimensions.get('window').height * .1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        backgroundColor:'rgb(250, 250, 250)',
        marginVertical:'1%'
    },
    section:{
        width:'25%',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    txtBtm:{
        textAlign:'center',
        fontSize:14,
        fontFamily: 'Graduate_400Regular'
    },
    txtTop:{
        textAlign:'center',
        fontSize:12,
        fontFamily: 'Graduate_400Regular',
        color:'lightgray'
    }
})

export default AllWoList