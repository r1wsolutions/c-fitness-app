import React,{useState} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DashBtn from '../../components/Dashboard/DashBtn'
import AllWoList from '../../components/Dashboard/AllWorkoutsList'
import CustomQuery from '../../components/Dashboard/CustomQuery'

const Dashboard = (props) => {

    const [showList, setShowList] = useState(true)
    
    const showListHanlder = () => {    
        setShowList(true)
    }

    const showCustomHanlder = () =>{
        setShowList(false)
    }

    const navHandler = (route) => {
        props.navigation.navigate(route)
    }

    return (
        <View
            style={styles.wrapper}
        >
           
            <View
                style={styles.top}
            >                
                {showList ?  <AllWoList
                                onClick={navHandler}    
                            /> : <CustomQuery />}
            </View>
            <View
                style={styles.bottom}
            >
                <DashBtn
                    title='list'
                    iconName='clipboard-list-outline'
                    onClick={showListHanlder}
                />   
                <View style={styles.divider}>
                    <View style={styles.line}></View>
                </View>
                <DashBtn
                    title='custom'
                    iconName='graph'
                    onClick={showCustomHanlder}
                />  
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        width:'100%',
        height: '100%',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'flex-start'

    },
    top:{
        width:'100%',
        height:'90%'
    },
    bottom:{
        height:'10%',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        
        borderTopColor:'gray',
        borderTopWidth:1,
    },
    divider:{
        width:'10%',
        height:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fd8f3b'
    },
    line:{
        height:'95%',
        width:'1%',
        backgroundColor:'gray'
    }
})

export default Dashboard