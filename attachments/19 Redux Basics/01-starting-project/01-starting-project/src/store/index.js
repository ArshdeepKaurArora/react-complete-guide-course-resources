import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import authReducer from './auth'

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
    reducer: {counter: counterReducer, auth: authReducer}
})

export default store
