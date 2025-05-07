import React, {useState, useEffect} from 'react'

const UPDATETIME = 10; // in milliseconds

const ProgressBar = ({timer}) => {

    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - UPDATETIME;
            });
        }, UPDATETIME);

        return () => clearInterval(interval);
    }, [])

  return (
    <progress value={remainingTime} max={timer}/>
  )
}

export default ProgressBar