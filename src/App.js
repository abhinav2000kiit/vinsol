import React from "react";
import _ from "underscore";
import { useSelector } from "react-redux";
import QuizPreparing from "./components/Quiz/QuizPreparing";
import QuizRunning from "./components/Quiz/QuizRunning";
import QuizResult from "./components/Quiz/QuizResult";
import constants from "./constants";

function App() {
  const { quiz1State, quiz2State, score1, score2 } = useSelector(
    (state) => ({
      quiz1State: state.quiz1.quizState,
      quiz2State: state.quiz2.quizState,
      score1: state.quiz1.score,
      score2: state.quiz2.score,
    }),
    _.isEqual
  );

  const Quiz1 = () => {
    switch (quiz1State) {
      case constants().RUNNING:
        return <QuizRunning quizNumber={1} />;
      case constants().FINISHED:
        return <QuizResult quizNumber={1} />;
      default:
        return <QuizPreparing quizNumber={1} />;
    }
  };
  const Quiz2 = () => {
    switch (quiz2State) {
      case constants().RUNNING:
        return <QuizRunning quizNumber={2} />;
      case constants().FINISHED:
        return <QuizResult quizNumber={2} />;
      default:
        return <QuizPreparing quizNumber={2} />;
    }
  };

  return (
    <>
      <h1>Total Score: {score1 || score2 ? score1 + score2 : 0}</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Quiz1 />
        <Quiz2 />
      </div>
    </>
  );
}

export default React.memo(App);
