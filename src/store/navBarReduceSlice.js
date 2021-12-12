import {createSlice} from '@reduxjs/toolkit'

const navBarInitialState = {
    closed: true
}

const navBarReducerSlice = createSlice({
    initialState: navBarInitialState,
    name: 'navBarReducerSlice',
    reducers:{
        toggleClose(state){
            state.closed = !state.closed
        }
    }
})

export const navBarReducerActions = navBarReducerSlice.actions
export default navBarReducerSlice.reducer