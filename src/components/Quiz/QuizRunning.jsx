import { useSelector } from "react-redux";
import QuizQuestion from "./QuizQuestion";

export default function QuizRunning(props) {
  const { questions, currQueNum } = useSelector((state) =>
    props.quizNumber === 1
      ? {
          questions: state.quiz1.questions,
          currQueNum: state.quiz1.currQueNum,
        }
      : {
          questions: state.quiz2.questions,
          currQueNum: state.quiz2.currQueNum,
        }
  );

  const QuestionsArray = questions.map((i, key) => (
    <QuizQuestion
      quizNumber={props.quizNumber}
      question={i}
      key={key}
      index={key}
    />
  ));

  return <>{QuestionsArray[currQueNum - 1]}</>;
}
