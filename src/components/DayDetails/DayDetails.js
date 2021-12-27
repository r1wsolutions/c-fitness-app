import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {exerciseCollectionActions} from '../../store/exerciseCollectionSlice'
import {View,ScrollView, Pressable, Text, SafeAreaView, StyleSheet,ActivityIndicator,FlatList, Dimensions} from 'react-native'
import SetDetail from './SetDetail'
import WoIcon from './WoIcon'

const DayDetails = (props) =>{

    const snapshot = props.navigation.getParam('snapshot')
    const date = props.navigation.getParam('date')

    const [isLoading,setIsLoading] = useState(true)
    const [setsDetails,setSetsDetails] = useState([])
    const [activeDetailTitle,setActiveDetailTitle] = useState('')
    const summaryData = useSelector((state)=>state.exerciseCollectionReducer.dailyWorkoutCollection) 
    const didSetDay = useSelector((state)=>state.exerciseCollectionReducer.didSetDay) 
    const dispatch = useDispatch()

    useEffect(()=>{

        const updateSnapshot = () =>{
            
            const tempCollection = []
            for(const key in snapshot)
            {
                const objToAdd = {
                    title:'',
                    sets:0,
                    setsDetails:[]
                }

                objToAdd.title = key

                for(const set in snapshot[key])
                {
                    objToAdd.sets++

                    objToAdd.setsDetails.push(snapshot[key][set])
                }
                tempCollection.push(objToAdd)
            }
            
            dispatch(exerciseCollectionActions.setDailyWorkouts({
                daySnapshot: tempCollection
            }))
            setIsLoading(false)
        }

        if(!didSetDay) updateSnapshot()

    },[isLoading,summaryData,didSetDay,dispatch])

    const loadDetailsHandler = (details) =>{
        setSetsDetails(details)
    }

    const onCloseHanlder = ()=>{
        setSetsDetails([])
        setActiveDetailTitle('')
        props.navigation.navigate('Dashboard')
    }

    return (
    <SafeAreaView
        style={styles.wrapper}
    >
        
        <View
            style={styles.scroll}
        >
            <View
                style={styles.subHeader}
            >
                <View
                    style={styles.title}
                >
                    <Text style={styles.date}>{date}</Text>   
                </View>
                <Pressable
                    style={styles.closeBtn}
                    onPress={onCloseHanlder}
                >
                    <Text
                        style={styles.ex}
                    >
                        X
                    </Text>
                </Pressable>
            </View>
            
            <View
                style={styles.summaryWrapper}
            >
                <View
                    style={styles.summaryHeader}
                >
                    <View style={styles.summaryTitleHolder}>
                        <Text style={styles.summaryTitle}>SETS</Text>
                    </View>
                </View>

                <View
                    style={styles.summary}
                >
                    {!isLoading && <FlatList 
                        data={summaryData} 
                        renderItem={({item})=><Pressable
                                                    style={styles.shadowProp}
                                                    onPress={()=>{
                                                        loadDetailsHandler(item.setsDetails)
                                                        setActiveDetailTitle(item.title)
                                                    }}
                                                >
                            <WoIcon
                                title={item.title}
                                sets={item.sets}
                                active={activeDetailTitle === item.title}
                            />
                        </Pressable>}
                        key={(i,key)=>i}
                        keyExtractor={(i,key)=>key}
                        numColumns={3} 
                        contentContainerStyle={{
                            width:'100%',
                            justifyContent:'flex-start',
                            alignItems:'center'
                        }}
                    />}
                </View>
            </View>
            {isLoading && <ActivityIndicator
                    size='large'
                    color='orange'
                /> }
            <SafeAreaView
                style={styles.details}
            >
                
                {
                    <FlatList 
                        data={setsDetails}
                        keyExtractor={(i,key)=>key}
                        renderItem={({item})=>{
                                    
                                    const hours = new Date(item.timestampe)
                                    let hour = hours.getHours()
                                    let mins = hours.getMinutes() > 9 ? hours.getMinutes() : `0${hours.getMinutes()}`
                                    let amPM = 'AM'
                                    if(hours.getHours() == 0)
                                    {
                                        hour = 12
                                    }
                                    if(hours.getHours() > 12)
                                    {
                                        hour = (hours.getHours() - 12)
                                    }
                                    if(hours.getHours() > 11)
                                    {
                                        amPM = 'PM'
                                    }

                                    return <SetDetail 
                                        reps={item.amount}
                                        time={`${hour} : ${mins} : ${amPM}`}
                                        //time={hours}
                                    />
                                            }
                                        }
                        contentContainerStyle={{
                            width:'100%',
                            flexDirection:'column'
                        }}
                    />
                }
                
            </SafeAreaView>
        </View>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        height:'100%',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:'black'    
    },
    scroll:{
        width:'95%',
        height:'95%',
        borderRadius:16,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white'
    },
    subHeader:{
        width:'100%',
        height:'5%',
        borderTopRightRadius:12,
        borderTopLeftRadius:12,
        flexDirection:'row',
        justifyContent:'flex-start',
        borderBottomWidth:1,
        borderBottomColor:'black',
        backgroundColor:'rgb(245,245,245)'
    },
    title:{
        width:'80%',
        height:'100%',
        justifyContent:'center',
        alignItems:'flex-start',
        borderTopLeftRadius:12
    },
    date:{
        marginLeft:'10%'
    },
    closeBtn:{
        borderTopRightRadius:12,
        width:'20%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'red'
    },
    ex:{
        fontSize: 24,
        fontWeight:'bold',
        color:'white'
    },
    summaryWrapper:{
        height:'40%',
        width:'100%',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    summaryHeader:{
        height:'10%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    summaryTitleHolder:{
        backgroundColor:'black',
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    summaryTitle:{
        color:undefined,
        color:'red',
        fontWeight:'bold'    
    },
    summary:{
        width:'100%',
        height:'90%',
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'black'
    },
    details:{
        width:'100%',
        height:'55%',
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        overflow:'hidden'
    },
    shadowProp: {
      shadowColor: 'black',
      shadowOffset: {width: 2, height: 4},
      shadowOpacity: .5,
      shadowRadius: 1,
      elevation:1,
      opacity:1,
      backgroundColor : "#0000" // invisible color
    }
})

export default DayDetails
