// @ts-check
import React from "react";
import QuizTimer from "./QuizTimer";
import Answer from "./Answer";
import { useCallback } from "react";
import QUESTIONS from "../data/questions.js";

const Question = ({index, onSelect}) => {

  const [answer, setAnswer] = React.useState({
    selectedAnswer: '',
    isCorrect: null
  });

  const question = QUESTIONS[index].text;
  const answers = QUESTIONS[index].answers;
  let timer = 10000;

  const handleSkipAnswer = useCallback(function handleSkipAnswer() {
    onSelect(null);
  }, []);

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
      });
      setTimeout(() => {
        onSelect(answer);
      }, 2000);
    }, 1000);
  }

  let answerStatus = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerStatus = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerStatus = 'answered';
  }

  if (answerStatus === 'answered') {
    timer = 1000;
  } 
  
  if (answerStatus === 'correct' || answerStatus === 'wrong') {
    timer = 2000;
  }

  return (
    <div id="question">
      <QuizTimer
        key={timer}
        onTimeout={answer.selectedAnswer === '' ? handleSkipAnswer : null}
        timeout={timer}
        mode={answerStatus}
      />
      <Answer
        question={question}
        answers={answers}
        selectedAnswer={answer.selectedAnswer}
        answerStatus={answerStatus}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
