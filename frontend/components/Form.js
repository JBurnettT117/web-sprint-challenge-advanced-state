import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {setQuiz, inputChange, disableChange, postQuiz} from '../state/action-creators'

export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;

  useEffect(() => {
    if(props.form.newQuestion.trim().length > 0 && props.form.newTrueAnswer.trim().length > 0 && props.form.newFalseAnswer.trim().length > 0){
      props.disableChange(props);//this is occuring only when everthing has 2 f's implying its checking before the state change resolves
    }
  }, [newQuestion, newTrueAnswer, newFalseAnswer]);

  const onChange = (evt) => {
    const field = evt.target.id;
    const value = evt.target.value
    props.inputChange(field, value, props);
  }

  const onSubmit = evt => {

  }

  console.log(props);

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={(evt) => onChange(evt, props)} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={(evt) => onChange(evt, props)} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={(evt) => onChange(evt, props)} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={props.form.submitQuizDisabled}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    form: state.form,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setQuiz: () => dispatch(setQuiz()),
    inputChange: (field, value, props) => dispatch(inputChange(field, value, props)),
    disableChange: (props) => dispatch(disableChange(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
