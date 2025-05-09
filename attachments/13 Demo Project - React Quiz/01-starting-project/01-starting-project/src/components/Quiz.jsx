import React, {useCallback, useState} from 'react'
import QUESTIONS from '../data/questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuizTimer from './QuizTimer.jsx'

const Quiz = () => {

    const [userAnswers, setUserAnswers] = useState([])
    const currentQuestionIndex = userAnswers.length;
    const quizIsOver = currentQuestionIndex === QUESTIONS.length;

    const handleAnswerClick = useCallback(function handleAnswerClick(answer) {
        
        setUserAnswers((prevUsersAnswers) => {
            const updatedAswers = [...prevUsersAnswers, answer]
            return updatedAswers
        })
    }, [userAnswers])

    const handleSkipAnswer = useCallback(function handleSkipAnswer() {
        handleAnswerClick(null);
    }, []);

    if (quizIsOver) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Quiz Trophy" />
                <h2>Quiz Complete!</h2>
            </div>
        )
    }

    const shuffledAnswers = QUESTIONS[currentQuestionIndex].answers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
        <div id="question">
            <QuizTimer key={currentQuestionIndex} onTimeout={handleSkipAnswer} timeout={10000} />
            <h2>{QUESTIONS[currentQuestionIndex].text}</h2>
            <ul id="answers">
                {shuffledAnswers.map((answer, index) => (
                    <li key={index} className='answer'>
                        <button onClick={() => handleAnswerClick(answer)}>{answer}</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Quiz