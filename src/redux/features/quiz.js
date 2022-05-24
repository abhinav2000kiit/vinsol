import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz1: {
    quizState: "PREPARING",
    numOfQues: 0,
    maxNum: 0,
    operators: [],
    questions: [],
    currQueNum: 1,
    userAnswers: [],
    systemAnswers: [],
    score: 0,
  },
  quiz2: {
    quizState: "PREPARING",
    numOfQues: 0,
    maxNum: 0,
    operators: [],
    questions: [],
    currQueNum: 1,
    userAnswers: [],
    systemAnswers: [],
    score: 0,
  },
};

const createQues = (state) => {
  let queArray = [];
  for (let i = 0; i < state.numOfQues; i++) {
    let a = Math.floor(Math.random() * state.maxNum);
    let b = Math.floor(Math.random() * state.maxNum);
    let operator =
      state.operators[Math.floor(Math.random() * state.operators.length)];
    let question = a + " " + operator + " " + b;
    queArray.push(question);
  }
  return queArray;
};

let updateDataSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    setQuizState(state, action) {
      return action.payload.quizNo === 1
        ? {
            ...state,
            quiz1: {
              ...state.quiz1,
              quizState: action.payload.quizState,
            },
          }
        : {
            ...state,
            quiz2: {
              ...state.quiz2,
              quizState: action.payload.quizState,
            },
          };
    },

    setInitialData(state, action) {
      return action.payload.quizNo === 1
        ? {
            ...state,
            quiz1: {
              ...state.quiz1,
              numOfQues: action.payload.numOfQues,
              maxNum: action.payload.maxNum,
              operators: [...action.payload.operatorArr],
            },
          }
        : {
            ...state,
            quiz2: {
              ...state.quiz2,
              numOfQues: action.payload.numOfQues,
              maxNum: action.payload.maxNum,
              operators: [...action.payload.operatorArr],
            },
          };
    },

    makeQuestions(state, action) {
      return action.payload.quizNo === 1
        ? {
            ...state,
            quiz1: {
              ...state.quiz1,
              questions: [...createQues(state.quiz1)],
            },
          }
        : {
            ...state,
            quiz2: {
              ...state.quiz2,
              questions: [...createQues(state.quiz2)],
            },
          };
    },

    updateCurrentQue(state, action) {
      return action.payload.quizNo === 1
        ? {
            ...state,
            quiz1: {
              ...state.quiz1,
              currQueNum: action.payload.currQueNum,
            },
          }
        : {
            ...state,
            quiz2: {
              ...state.quiz2,
              currQueNum: action.payload.currQueNum,
            },
          };
    },

    updateAnswers(state, action) {
      return action.payload.quizNo === 1
        ? {
            ...state,
            quiz1: {
              ...state.quiz1,
              userAnswers: [...state.quiz1.userAnswers].concat(
                action.payload.userAnswers
              ),
              systemAnswers: [...state.quiz1.systemAnswers].concat(
                action.payload.systemAnswers
              ),
            },
          }
        : {
            ...state,
            quiz2: {
              ...state.quiz2,
              userAnswers: [...state.quiz2.userAnswers].concat(
                action.payload.userAnswers
              ),
              systemAnswers: [...state.quiz2.systemAnswers].concat(
                action.payload.systemAnswers
              ),
            },
          };
    },

    updateScore(state, action) {
      return action.payload.quizNo === 1
        ? {
            ...state,
            quiz1: {
              ...state.quiz1,
              score: action.payload.score,
            },
          }
        : {
            ...state,
            quiz2: {
              ...state.quiz2,
              score: action.payload.score,
            },
          };
    },

    reset(state, action) {
      return action.payload.quizNo === 1
        ? {
            ...state,
            quiz1: initialState.quiz1,
          }
        : {
            ...state,
            quiz2: initialState.quiz2,
          };
    },
  },
});

export const {
  setQuizState,
  setInitialData,
  makeQuestions,
  updateCurrentQue,
  updateAnswers,
  updateScore,
  reset,
} = updateDataSlice.actions;
export default updateDataSlice.reducer;
