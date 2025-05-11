import React from "react";

const QuizTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = React.useState(timeout);

  React.useEffect(() => {
    console.log("Timeout");
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  React.useEffect(() => {
    console.log("Timer started");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        return prevTime - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} className={mode} />;
};

export default QuizTimer;
