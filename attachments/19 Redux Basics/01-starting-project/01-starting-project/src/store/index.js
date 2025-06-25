import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
    count: 0,
    showCounter: false
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
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

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return {count: state.count + 1, showCounter: state.showCounter}
//         case 'DECREMENT':
//             return {count: state.count - 1, showCounter: state.showCounter}
//         case 'TOGGLE_COUNTER':
//             return {count: state.count, showCounter: !state.showCounter}
//         case 'INCREASE':
//             return {count: state.count + action.payload, showCounter: state.showCounter}
//         default:
//             return state
//     }
// }

// const store = createStore(reducer)

const store = configureStore({
    reducer: counterSlice.reducer
})

export const counterActions = counterSlice.actions

export default store
