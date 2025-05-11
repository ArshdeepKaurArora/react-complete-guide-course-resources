// @ts-check
import React, { useCallback, useState } from "react";
import QUESTIONS from "../data/questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerStatus, setAnswerStatus] = useState("");

  const currentQuestionIndex =
    answerStatus === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsOver = currentQuestionIndex === QUESTIONS.length;

  const handleAnswerClick = useCallback(
    function handleAnswerClick(answer) {
      setUserAnswers((prevUsersAnswers) => {
        const updatedAswers = [...prevUsersAnswers, answer];
        return updatedAswers;
      });
    },
    [currentQuestionIndex]
  );

  if (quizIsOver) {
    return (
      <Summary userAnswers={userAnswers}/>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={currentQuestionIndex}
        index={currentQuestionIndex}
        onSelect={handleAnswerClick}
      />
    </div>
  );
};

export default Quiz;
