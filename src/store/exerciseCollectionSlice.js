import { createSlice, current } from "@reduxjs/toolkit";

const initialExercisesState = {
    allWorkouts: [],
    exerciseCollection: [],
    dailyWorkoutCollection: [], 
    didSetDay: false,
    didRetrieveExercises: null,
    errorMessage: ''
}

const exerciseCollectionSlice = createSlice({
    initialState: initialExercisesState,
    name: 'exerciseSlice',
    reducers:{
        addAllWorkouts(state,action){
            state.allWorkouts = action.payload.allWorkouts
        },
        addExercise(state,action){
            state.exerciseCollection.push(action.payload.excercise)
        },
        replaceExcerciseCollection(state,action){

            if(action.payload.error)
            {
                state.errorMessage = action.payload.error.message
                state.didRetrieveExercises = false
                return
            }

            state.didRetrieveExercises = true
            state.errorMessage = ''
            let collectionToConvert = action.payload.exerciseCollection
            const newCollection = []
            
            for(let i in collectionToConvert)
            {
                newCollection.push({
                    date: i,
                    exercises: collectionToConvert[i]
                })
            }

            state.exerciseCollection = newCollection
        },
        addToDailyWorkout(state, action){
            //Keep any heavy lifting outside of the reducer
            state.dailyWorkoutCollection.push({
                exercise: action.payload.workout.exercise,
                amount: action.payload.workout.amount,
                sets: 1
            })
        },
        updateToDailyWorkout(state, action){
           
            let copyCollection = [...current(state.dailyWorkoutCollection)]
            
            const indexToUpdate = copyCollection.findIndex((wo) => wo.exercise === action.payload.exercise)
            const newAmount = parseInt(copyCollection[indexToUpdate].amount) + parseInt(action.payload.amountToAdd)
            const newSetCount = parseInt(copyCollection[indexToUpdate].sets) + 1
            state.dailyWorkoutCollection[indexToUpdate].amount = newAmount
            state.dailyWorkoutCollection[indexToUpdate].sets = newSetCount
        },
        clearDailyWorkout(state,action){
            state.dailyWorkoutCollection = []
        },
        setDailyWorkouts(state,action){
            state.dailyWorkoutCollection = action.payload.daySnapshot
            state.didSetDay = true
        },
        setDidSetDay(state,action){
            state.didSetDay = action.payload.status
            state.dailyWorkoutCollection = []
        },
        clearAll(state,action){
            state.didSetDay = false
            state.allWorkouts = []
            state.exerciseCollection = []
            state.dailyWorkoutCollection = []
        }
    }
})

export const exerciseCollectionActions = exerciseCollectionSlice.actions

export default exerciseCollectionSlice.reducer