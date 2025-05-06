import React, {useRef, useState} from 'react'
import ResultModal from './ResultModal';

const TimerChallenge = ({title, targetTime}) => {

    const timer = useRef(null);
    const dialogRef = useRef(null);

    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    if (timeRemaining <= 0 ) {
        clearInterval(timer.current);
        dialogRef.current.open();
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining((prev) => prev - 10);
        }, 10)
    }

    const handleStop = () => {
        clearInterval(timer.current);
        dialogRef.current.open();
    }

    const handleReset = () => {
        setTimeRemaining(targetTime*1000);
    };

  return (
    <>
        <ResultModal targetTime={targetTime} ref={dialogRef} timeRemaining={timeRemaining} handleReset={handleReset} />
        <section className='challenge'>
            <h2>{title}</h2>
            <p className='challenge-time'>{targetTime} seconds</p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>{!timerIsActive ? 'Start' : 'Stop'} Challenge</button>
            </p>
            <p className={timerIsActive ? "active"  : undefined}>
                {timerIsActive ? 'Timer is Running...' : 'Timer inactive'}
            </p>
        </section>
    </>
  )
}

export default TimerChallenge