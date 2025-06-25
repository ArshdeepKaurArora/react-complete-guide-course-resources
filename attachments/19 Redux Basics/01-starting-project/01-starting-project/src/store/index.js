import {createStore } from 'redux'


const initialState = {
    count: 0,
    showCounter: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {count: state.count + 1, showCounter: state.showCounter}
        case 'DECREMENT':
            return {count: state.count - 1, showCounter: state.showCounter}
        case 'TOGGLE_COUNTER':
            return {count: state.count, showCounter: !state.showCounter}
        case 'INCREASE':
            return {count: state.count + action.payload, showCounter: state.showCounter}
        default:
            return state
    }
}

const store = createStore(reducer)

export default store
