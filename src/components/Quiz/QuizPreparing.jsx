import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setQuizState,
  setInitialData,
  makeQuestions,
} from "../../redux/features/quiz";
import constants from './../../constants';

const Quiz = (props) => {
  var operators = [
    {
      name: "add",
      value: "+",
    },
    {
      name: "substract",
      value: "-",
    },
    {
      name: "multiply",
      value: "*",
    },
    {
      name: "divide",
      value: "/",
    },
    {
      name: "modulus",
      value: "%",
    },
    {
      name: "or",
      value: "|",
    },
    {
      name: "and",
      value: "&",
    },
    {
      name: "xor",
      value: "^",
    },
    {
      name: "left shift",
      value: "<<",
    },
    {
      name: "signed right shift",
      value: ">>",
    },
    {
      name: "right shift",
      value: ">>>",
    },
  ];

  const [numOfQues, setNumOfQues] = useState(0);
  const [maxNum, setMaxNum] = useState(0);
  const [operatorArr, setOperatorArr] = useState([]);

  const [err, setErr] = useState(false);

  const changeSelectedOperators = (e) => {
    if (e.target.checked)
      setOperatorArr([...operatorArr.concat(e.target.value)]);
    else setOperatorArr([...operatorArr.filter((i) => i !== e.target.value)]);
  };

  const dispatch = useDispatch();
  const startQuiz = () => {
    if (numOfQues <= 0 || maxNum <= 0 || operatorArr.length === 0) setErr(true);
    else {
      setErr(false);
      dispatch(setInitialData({ quizNo: props.quizNumber, numOfQues, maxNum, operatorArr }));
      dispatch(makeQuestions({ quizNo: props.quizNumber }));
      dispatch(setQuizState({ quizNo: props.quizNumber, quizState: constants().RUNNING }));
    }
  };

  return (
    <div style={{border: "5px solid black", padding: "0vh 1vw 1vh", margin: "3vh 2vw", height: "fit-content"}}>
      <h1>Welcome to Quiz {props.quizNumber}</h1>
      <div>
        <span>Input number of questions you want: </span>
        <input
          type="number"
          value={numOfQues}
          onChange={(e) => setNumOfQues(e.target.value)}
        />
      </div>
      <div>
        <span>Input maximum number range for the questions: </span>
        <input
          type="number"
          value={maxNum}
          onChange={(e) => setMaxNum(e.target.value)}
        />
      </div>
      <br />
      <div>
        <span>Select operators you want for the questions: </span>
        {operators.map((i, key) => {
          return (
            <div key={key}>
              <input
                type="checkbox"
                id={i.name}
                name={i.name}
                value={i.value}
                onChange={(e) => changeSelectedOperators(e)}
              />
              <label htmlFor={i.name}>{i.name + " (" + i.value + ") "}</label>
            </div>
          );
        })}
      </div>
      <br />
      <button type="submit" onClick={() => startQuiz()}>
        Start Quiz
      </button>
      {err && (
        <div style={{ color: "red", fontSize: "0.7rem" }}>
          <br />
          Error:
          {numOfQues <= 0 && (
            <div>*Please enter number of questions &gt; 0</div>
          )}
          {maxNum <= 0 && <div>*Please enter maximum number range &gt; 0</div>}
          {operatorArr.length === 0 && (
            <div>*Please choose at least one operator</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;