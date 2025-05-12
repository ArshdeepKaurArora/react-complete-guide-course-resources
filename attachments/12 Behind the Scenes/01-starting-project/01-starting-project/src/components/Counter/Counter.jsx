import {useState, memo, useMemo, useCallback } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  const [counter, setCounter] = useState([{value: initialCount, id: Math.random()*100}]);

  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => {
      const newCounter = [...prevCounter];
      const newValue = newCounter[0].value - 1;
      newCounter.unshift({value: newValue, id: Math.random()*100});
      return newCounter;
    })
  }, [])

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => {
      const newCounter = [...prevCounter];
      const newValue = newCounter[0].value + 1;
      newCounter.unshift({value: newValue, id: Math.random()*100});
      return newCounter;
    })
  }, [])

  console.log('Counter:', counter);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter[0].value} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counter} />
    </section>
  );
})

export default Counter;