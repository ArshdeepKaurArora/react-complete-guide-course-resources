import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);
  const showCounter = useSelector(state => state.showCounter);

  const incrementHandler = () => {
    dispatch({type: 'INCREMENT'})
  }
  const decrementHandler = () => {
    dispatch({type: 'DECREMENT'})
  }
  const toggleCounterHandler = () => {
    dispatch({type: 'TOGGLE_COUNTER'})
  }
  const increaseHandler = () => {
    dispatch({type: 'INCREASE', payload: 5})
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{count}</div>}
      <button onClick={incrementHandler}>Increment</button>
      <button onClick={decrementHandler}>Decrement</button>
      <button onClick={increaseHandler}>Increase by 5</button>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
