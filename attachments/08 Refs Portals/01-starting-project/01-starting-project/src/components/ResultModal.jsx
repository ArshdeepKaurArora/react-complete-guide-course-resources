import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(({targetTime, timeRemaining, handleReset}, ref) => {

    const dialog = useRef(null);
    const formatTimeRemaining = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
    const result = timeRemaining > 0 ? "You Win" : "You Lose";

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });
    
  return (
    createPortal(<dialog className='result-modal' ref={dialog} onClose={handleReset}>
        <h2>{result}</h2>
        {timeRemaining > 0 && <p>Your score is <strong>{score}</strong></p>}
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>{formatTimeRemaining} seconds left.</strong></p>
        <form method="dialog" onSubmit={handleReset}>
            <button>Close</button>
        </form>
    </dialog>, document.getElementById("modal"))
  )
})

export default ResultModal