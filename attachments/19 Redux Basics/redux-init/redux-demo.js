const redux = require("redux");

const initialState = {
    count: 0,
}

const reducer = (state = initialState, action) => {
    if (action.type === "INCREMENT") {
        return {
            ...state,
            count: state.count + 1,
        }
    }
    return state;
}

const store = redux.createStore(reducer);

const storeSubscribe = store.subscribe(() => {
    const state = store.getState();
    console.log(state);
})

store.dispatch({type: "INCREMENT"});