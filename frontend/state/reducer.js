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
} from './action-types';

// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'

const initialWheelState = {activeCog: 0}


function wheel(state = initialWheelState, action) {
 switch (action.type) {
  case MOVE_CLOCKWISE:
    return {
      ...state,
      activeCog: (state.activeCog + 1) % 6
    }
  case MOVE_COUNTERCLOCKWISE:
    return {
      ...state,
      activeCog: (state.activeCog + 5) % 6
    }
 }
  return (state);
}

const initialQuizState = {
  quiz_id:null,
  question:null,
  answerOneId:null,
  answerOneText:null,
  answerTwoId:null,
  answerTwoText:null,
  isDoneFetching: false,
}

function quiz(state = initialQuizState, action) {
  switch(action.type) {
    case SET_QUIZ_INTO_STATE:
      return {
        ...state,
        quiz_id: action.payload.quiz_id,
        question: action.payload.question,
        answerOneId: action.payload.answers[0].answer_id,
        answerOneText: action.payload.answers[0].text,
        answerTwoId: action.payload.answers[1].answer_id,
        answerTwoText: action.payload.answers[1].text,
        isDoneFetching: true
        //add all of your quiz readout changes here
      } 
    case FETCHING_QUIZ:
      return {
        ...state,
        isDoneFetching: false,
      }
  }
  return state
}

const initialSelectedAnswerState = {
  firstAnswerSelected: false,
  secondAnswerSelected: false
}

function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER1:
      return {
        ...state,
        firstAnswerSelected:true,
        secondAnswerSelected: false
      }
    case SET_SELECTED_ANSWER2:
      return {
        ...state,
        firstAnswerSelected:false,
        secondAnswerSelected:true
      }
    case SET_INFO_MESSAGE:
      return {
        ...state,
        firstAnswerSelected: false,
        secondAnswerSelected: false
      }
  }
  return state
}

const initialMessageState = {message: ''}

function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return {
        ...state,
        message: action.payload.message
      }
  }
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
  // submitQuizDisabled: true,
}

function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload]: action.value,
      }
    // case DISABLE_CHANGE:
    //   return {
    //     ...state,
    //     submitQuizDisabled: false,
    //   }
    case RESET_FORM:
      return  form = initialFormState;
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
