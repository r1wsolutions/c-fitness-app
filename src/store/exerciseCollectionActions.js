import {exerciseCollectionActions} from "./exerciseCollectionSlice";

export const retrieveExerciseCollection =(uid, token) =>{

    return async (dispatch) =>{
        try {
            const fetchRequest = await fetch('https://cadence-fitness-default-rtdb.firebaseio.com/'+uid+'/workouts.json?auth='+token)
            const tempArray = []

            if(!fetchRequest.ok)
            {
                throw new Error('Failed to load workout data')
            }

            const completedRequest = await fetchRequest.json()

            //loop through years first
            for(const year in completedRequest)
            {
                for(const month in completedRequest[year])
                {
                    for(const date in completedRequest[year][month])
                    {
                        const day = new Date(date)

                        const objToAdd = {
                            date: `${day.getMonth()} - ${day.getDate()} - ${day.getFullYear()}`,
                            exercisesPerformed: 0,
                            setsCompleted: 0,
                            repsCompleted: 0
                        }

                        for(const exObj in completedRequest[year][month][date])
                        {
                            objToAdd.exercisesPerformed++

                            for(const set in completedRequest[year][month][date][exObj])
                            {
                                objToAdd.setsCompleted++

                                for(const rep in completedRequest[year][month][date][exObj][set])
                                {
                                    objToAdd.repsCompleted+= parseInt(completedRequest[year][month][date][exObj][set].amount)
                                }
                            }
                        }

                        tempArray.push(objToAdd)
                    }
                }
            }
            // console.log('temp arr')
            // console.log(tempArray)

            dispatch(exerciseCollectionActions.addAllWorkouts({allWorkouts: tempArray}))

            return

            dispatch(exerciseCollectionActions.replaceExcerciseCollection({
                exerciseCollection: completedRequest
            }))

        } catch (error) {
           console.log('error retr items')
        }
    }
}

export const retrieveMonthlyExerciseCollection =(year, month, uid, token) =>{

    return async (dispatch) =>{
        try {

            const searchYear = year.toString()
            const searchMonth = month.toString()
            
            const fetchRequest = await fetch('https://cadence-fitness-default-rtdb.firebaseio.com/'+uid+'/workouts/'+searchYear+'/'+searchMonth+'.json?auth='+token)


            if(!fetchRequest.ok)
            {
                throw new Error('Failed to load workout data')
            }

            const completedRequest = await fetchRequest.json()

            if(!completedRequest)
            {
                throw new Error('No workouts completed for selected month')
            }
            
            dispatch(exerciseCollectionActions.replaceExcerciseCollection({
                exerciseCollection: completedRequest
            }))

        } catch (error) {
           dispatch(exerciseCollectionActions.replaceExcerciseCollection({
                error: {
                    message: error.message
                }
            }))
        }
    }

}