import React, {useRef, useState} from 'react'
import ResultModal from './ResultModal';

const TimerChallenge = ({title, targetTime}) => {

    const timer = useRef(null);
    const dialogRef = useRef(null);

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    const handleStart = () => {
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            setTimerStarted(false);
            dialogRef.current.showModal();
        }, targetTime * 1000);
        setTimerStarted(true);
    }

    const handleStop = () => {
        clearTimeout(timer.current);
        setTimerStarted(false);
    }


  return (
    <>
        <ResultModal result="lost" targetTime={targetTime} ref={dialogRef} />
        <section className='challenge'>
            <h2>{title}</h2>
            <p className='challenge-time'>{targetTime} seconds</p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>{!timerStarted ? 'Start' : 'Stop'} Challenge</button>
            </p>
            <p className={timerStarted ? "active"  : undefined}>
                {timerStarted ? 'Timer is Running...' : 'Timer inactive'}
            </p>
        </section>
    </>
  )
}

export default TimerChallenge