//@ts-check
import React, { useRef } from 'react'

const Answer = ({question, answers, selectedAnswer, answerStatus, onSelect}) => {

    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers]
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

  return (
    <>
        <h2>{question}</h2>
        <ul id="answers">
            {shuffledAnswers.current.map((answer, index) => {
                let cssClasses = '';
                if (answer === selectedAnswer) {
                    if (answerStatus === 'correct') {
                        cssClasses = 'correct';
                    }
                    else if (answerStatus === 'wrong') {
                        cssClasses = 'wrong';
                    } else if (answerStatus === 'answered') {
                        cssClasses = 'selected';
                    }
                }
                return (<li key={index} className='answer'>
                    <button onClick={() => onSelect(answer)} className={cssClasses} disabled={answerStatus !== ''}>{answer}</button>
                </li>)
            })}
        </ul>
    </>
  )
}

export default Answer