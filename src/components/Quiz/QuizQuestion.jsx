import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizState,
  updateCurrentQue,
  updateAnswers,
  updateScore,
} from "../../redux/features/quiz";
import constants from "./../../constants";

export default function QuizQuestion(props) {
  const [indiviualAns, setIndiviualAns] = useState();
  const [timer, setTimer] = useState(constants().timerInitialValue);

  useEffect(() => {
    let loop;
    if (currQueNum - 1 === props.index) {
      loop = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    if (timer === 0) {
      clearInterval(loop);
      submitAns();
    }
  }, [timer]);

  const {
    quizState,
    questions,
    currQueNum,
    userAnswers,
    systemAnswers,
    score,
  } = useSelector((state) =>
    props.quizNumber === 1
      ? {
          quizState: state.quiz1.quizState,
          questions: state.quiz1.questions,
          currQueNum: state.quiz1.currQueNum,
          userAnswers: state.quiz1.userAnswers,
          systemAnswers: state.quiz1.systemAnswers,
          score: state.quiz1.score,
        }
      : {
          quizState: state.quiz2.quizState,
          questions: state.quiz2.questions,
          currQueNum: state.quiz2.currQueNum,
          userAnswers: state.quiz2.userAnswers,
          systemAnswers: state.quiz2.systemAnswers,
          score: state.quiz2.score,
        }
  );

  const actualAnswer = Function("return " + props.question);

  const dispatch = useDispatch();
  const submitAns = () => {
    dispatch(
      updateCurrentQue({ quizNo: props.quizNumber, currQueNum: currQueNum + 1 })
    );
    dispatch(
      updateAnswers({
        quizNo: props.quizNumber,
        userAnswers: indiviualAns,
        systemAnswers: actualAnswer(),
      })
    );
    if (indiviualAns === actualAnswer())
      dispatch(updateScore({ quizNo: props.quizNumber, score: score + 1 }));
    setIndiviualAns(" ");
    if (currQueNum + 1 > questions.length)
      dispatch(
        setQuizState({
          quizNo: props.quizNumber,
          quizState: constants().FINISHED,
        })
      );
  };

  const endTest = () => {
    for (let i = currQueNum - 1; i < questions.length; i++) {
      const systemAnswers = Function("return " + questions[i]);
      const userAnswers = null;
      dispatch(
        updateAnswers({
          quizNo: props.quizNumber,
          userAnswers,
          systemAnswers: systemAnswers(),
        })
      );
    }
    dispatch(
      setQuizState({
        quizNo: props.quizNumber,
        quizState: constants().FINISHED,
      })
    );
  };
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "0px 2vw",
        margin: "2vh 2vw",
        height: "fit-content"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>
          Question No. {props.index + 1} of {questions.length}
        </h3>
        <i>{quizState === "RUNNING" && timer + " Seconds left"}</i>
      </div>

      <div>
        <u>Que:</u> &nbsp;&nbsp; {props.question} = ?
      </div>
      {quizState === "RUNNING" ? (
        <>
          <input
            type="number"
            value={indiviualAns}
            onChange={(e) => setIndiviualAns(Number(e.target.value))}
          />
          <button type="submit" onClick={() => submitAns(indiviualAns)}>
            Submit
          </button>
          <button type="submit" onClick={() => endTest()}>
            End Test
          </button>
          <div>Present Score: {score}</div>
        </>
      ) : (
        <>
          <div style={{ backgroundColor: "yellow", width: "fit-content" }}>
            System Answer: {systemAnswers[props.index]}
          </div>
          {systemAnswers[props.index] === userAnswers[props.index] ? (
            <>
              <div style={{ backgroundColor: "green", width: "fit-content" }}>
                User Answer: {userAnswers[props.index]}
              </div>
              <h4>Question Score: 1</h4>
            </>
          ) : (
            <>
              <div style={{ backgroundColor: "red", width: "fit-content" }}>
                User Answer: {userAnswers[props.index]}
              </div>
              <h4>Question Score: 0</h4>
            </>
          )}
        </>
      )}
    </div>
  );
}
