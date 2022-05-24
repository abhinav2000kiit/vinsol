import { useSelector, useDispatch } from "react-redux";
import { setQuizState, reset } from "../../redux/features/quiz";
import QuizQuestion from "./QuizQuestion";
import constants from "./../../constants";

export default function QuizResult(props) {
  const { questions, score } = useSelector((state) =>
    props.quizNumber === 1
      ? {
          questions: state.quiz1.questions,
          score: state.quiz1.score,
        }
      : {
          questions: state.quiz2.questions,
          score: state.quiz2.score,
        }
  );

  const dispatch = useDispatch();
  const restart = () => {
    dispatch(reset({ quizNo: props.quizNumber }));
    dispatch(
      setQuizState({
        quizNo: props.quizNumber,
        quizState: constants().PREPARING,
      })
    );
  };

  return (
    <div style={{border: "5px solid black", padding: "0vh 1vw 1vh", marginTop: "3vh", height: "fit-content"}}>
      <h2>Quiz{props.quizNumber} Score: {score}</h2>
      {questions.map((i, key) => (
        <QuizQuestion
          quizNumber={props.quizNumber}
          question={i}
          key={key}
          index={key}
        />
      ))}
      <button type="submit" onClick={() => restart()}>
        Restart Quiz
      </button>
    </div>
  );
}
