import axios from 'axios';

import { MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  FETCHING_QUIZ, 
  SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER1, 
  SET_SELECTED_ANSWER2,
  SET_INFO_MESSAGE, 
  INPUT_CHANGE,
  RESET_FORM
} from "./action-types";

export function moveClockwise(state) {
  return {
    type: MOVE_CLOCKWISE,
    payload: state
  }
}

export function moveCounterClockwise(state) {
  return {
    type: MOVE_COUNTERCLOCKWISE,
    payload: state
  }
}

export function selectAnswer(state, answerNumber) {
  if(answerNumber === 1){
    return {
      type: SET_SELECTED_ANSWER1,
      payload: state,
    } 
  } else if(answerNumber === 2){
    return {
      type: SET_SELECTED_ANSWER2,
      payload: state,
    }
  }
}

export function setMessage() { }

export function setQuiz() { }

export function inputChange(field, value, props) {
  return {
    type: INPUT_CHANGE,
    payload: field, value, props
  }
}

export function resetForm() {
  return {
    type: RESET_FORM
  }
}

export function fetchQuiz(state) {

  return function (dispatch) {
    dispatch({type: FETCHING_QUIZ})

    axios.get("http://localhost:9000/api/quiz/next")
    .then((res)=> {
      dispatch({type: SET_QUIZ_INTO_STATE, payload: res.data, state})
    })
    .catch((err) => {
      console.log(err);
    })
    
  }
}
export function postAnswer(state) {
  return function (dispatch) {
    if(state.selectedAnswer.firstAnswerSelected === true){
      const payload = {quiz_id: state.quiz.quiz_id ,answer_id: state.quiz.answerOneId }
      axios.post("http://localhost:9000/api/quiz/answer", payload)
        .then((res) => {console.log(res.data);
          dispatch ({type: SET_INFO_MESSAGE, payload: res.data, state })
          state.fetchQuiz(state);
        })
    } else if(state.selectedAnswer.secondAnswerSelected === true){
      const payload = {quiz_id: state.quiz.quiz_id ,answer_id: state.quiz.answerTwoId }
      axios.post("http://localhost:9000/api/quiz/answer", payload)
        .then((res) => {console.log(res.data);
          dispatch ({type: SET_INFO_MESSAGE, payload: res.data, state })
          state.fetchQuiz(state);
        })

    };
    state.fetchQuiz(state);

    };
  }

export function postQuiz(state) {
  return function (dispatch) {
    const payload = {question_text: state.form.newQuestion, 
      true_answer_text: state.form.newTrueAnswer,
      false_answer_text: state.form.newFalseAnswer,
    };
    axios.post("http://localhost:9000/api/quiz/new", payload)
      .then(res => {if(res.status === 201){
        console.log(res);
        dispatch ({type: SET_INFO_MESSAGE, payload:{ message: `Congrats: "${res.data.question}" is a great question!`, state}})
        }else{
        console.log("Error: ", res);
        }})
  }
}
