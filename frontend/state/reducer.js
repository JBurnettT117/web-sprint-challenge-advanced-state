import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from './action-types';

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

const initialQuizState = null

function quiz(state = initialQuizState, action) {
  
  return state
}

const initialSelectedAnswerState = null

function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''

function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}

function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
