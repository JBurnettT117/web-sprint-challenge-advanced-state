// ❗ You don't need to add extra action types to achieve MVP
export const MOVE_CLOCKWISE = 'MOVE_CLOCKWISE'//youve already used these
export const MOVE_COUNTERCLOCKWISE = 'MOVE_COUNTERCLOCKWISE'//youve already used these
export const FETCHING_QUIZ = 'FETCHING_QUIZ'//use this to show the loading page
export const SET_QUIZ_INTO_STATE = 'SET_QUIZ_INTO_STATE'//use this when you get the api back
export const SET_SELECTED_ANSWER1 = 'SET_SELECTED_ANSWER1'//for quiz page
export const SET_SELECTED_ANSWER2 = 'SET_SELECTED_ANSWER2'//for quiz page
export const SET_INFO_MESSAGE = 'SET_INFO_MESSAGE'//probably used for the quiz state. double check example
export const INPUT_CHANGE = 'INPUT_CHANGE'//this is all you need for the form page
export const RESET_FORM = 'RESET_FORM'//use this for when you submit
export const DISABLE_CHANGE = 'DISABLE_CHANGE'
