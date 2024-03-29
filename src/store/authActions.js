import {authReducerActions} from './authReducerSlice'
import {errorActions} from '../store/errorReducderSlice'

const authApi = 'AIzaSyCLIOMlSIiJpNCoaiCozCJ7XTFQ1rvi1lY'

export const registerAction =(profile) => {

    return async (dispatch) => {

        try {

            const postRequest = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+authApi,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: profile.email,
                    password: profile.password,
                    returnSecureToken:true
                })
            })

            
            const postResponse = await postRequest.json()

            if(postResponse.error)
            {
                if(postResponse.error.errors.length > 1)//we have multiple errors
                {
                    let responseError = ''
                    let messageCount = 0
                    for(let message in postResponse.error.errors)
                    {
                        messageCount++
                        responseError+=  ' error- '+messageCount+':' + postResponse.error.errors[message].message +'\n'
                    }

                    throw new Error(responseError)
                }
                
                throw new Error(postResponse.error.errors[0].message)
                
            }

            if(!postRequest.ok)
            {
                throw new Error('failed to add new user')
            }

            createProfileAction(postResponse.localId,postResponse.idToken,profile)
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const createProfileAction = async (uid,token,profile) => {
    
    try {

        const putProfileRequest = await fetch(`https://cadence-fitness-default-rtdb.firebaseio.com/${uid}/profile.json?auth=${token}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: profile.email,
                fName: profile.firstName,
                lName: profile.lastName
            })
        })

        const putProfileResponse = await putProfileRequest.json()   

        if(!putProfileRequest.ok)
        {
            throw new Error(putProfileResponse.error)
        }

    } catch (error) {
        console.log(error)
    }
} 

export const signinAction =(email, password) => {

    return async (dispatch) => {

        try {
            const postRequest = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+authApi,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken:true
                })
            })

            
            const postResponse = await postRequest.json()
            
            if(!postRequest.ok)
            {
                console.log(postResponse.error.errors[0].message)
                throw new Error(postResponse.error.message)
            }
            
            dispatch(authReducerActions.registerSignInAction(postResponse))
            
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export const getProfileAction =(uid,token) => {

    return async (dispatch) => {

        
        try {
            const postRequest = await fetch(`https://cadence-fitness-default-rtdb.firebaseio.com/${uid}/profile.json?auth=${token}`,{
                method: "GET"
            })
            
            const postResponse = await postRequest.json()

            if(!postRequest.ok)
            {
                throw new Error(postResponse.error)
            }
            
            dispatch(authReducerActions.setProfile({profile: postResponse}))
            
        } catch (error) {
            
            dispatch(authReducerActions.setProfile({
                error: error
            }))
        }
    }
}