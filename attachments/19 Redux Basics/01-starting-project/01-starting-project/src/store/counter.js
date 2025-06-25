import { createSlice } from '@reduxjs/toolkit'

const initialCounterState = {
    count: 0,
    showCounter: false
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment: (state) => {
            state.count++
        },
        decrement: (state) => {
            state.count--
        },
        increase: (state, action) => {
            state.count += action.payload
        },
        toggleCounter: (state) => {
            state.showCounter = !state.showCounter
        }
    }
})

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;