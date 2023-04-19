import axios from 'axios';

import { MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  FETCHING_QUIZ, 
  SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER1, 
  SET_SELECTED_ANSWER2,
  SET_INFO_MESSAGE, 
  INPUT_CHANGE,
  // DISABLE_CHANGE,
  RESET_FORM
} from "./action-types";

// ❗ You don't need to add extra action creators to achieve MVP
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

// export function disableChange(props) {
//   return {
//     type: DISABLE_CHANGE,
//     payload: props
//   }
// }

export function resetForm() {
  return {
    type: RESET_FORM
  }
}

// ❗ Async action creators
//this is for getting the question
export function fetchQuiz(state) {

  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch({type: FETCHING_QUIZ})

    axios.get("http://localhost:9000/api/quiz/next")
    .then((res)=> {
      // On successful GET:
      // - Dispatch an action to send the obtained quiz to its state
      dispatch({type: SET_QUIZ_INTO_STATE, payload: res.data, state})
    })
    .catch((err) => {
      console.log(err);
    })
    
  }
}
//this is for answering the question
export function postAnswer(state) {
  return function (dispatch) {
    if(state.selectedAnswer.firstAnswerSelected === true){
      const payload = {quiz_id: state.quiz.quiz_id ,answer_id: state.quiz.answerOneId }
      axios.post("http://localhost:9000/api/quiz/answer", payload)
        .then((res) => {console.log(res.data);
          dispatch ({type: SET_INFO_MESSAGE, payload: res.data, state })
        })
    } else if(state.selectedAnswer.secondAnswerSelected === true){
      const payload = {quiz_id: state.quiz.quiz_id ,answer_id: state.quiz.answerTwoId }
      axios.post("http://localhost:9000/api/quiz/answer", payload)
        .then((res) => {console.log(res.data);
          dispatch ({type: SET_INFO_MESSAGE, payload: res.data, state })
        })
    };//submit quiz button needs to be disabled until answer is selected
    state.fetchQuiz(state);
    // On successful POST:
    // - Dispatch the fetching of the next quiz
  }
}
//this is for posting your own question
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
        //put the form reset here
        }else{
        console.log("Error: ", res);
        }})
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
