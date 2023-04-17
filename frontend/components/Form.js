import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {setQuiz, inputChange, disableChange, postQuiz, resetForm} from '../state/action-creators'

export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;

  useEffect(() => {
    if(props.form.newQuestion.trim().length > 0 && props.form.newTrueAnswer.trim().length > 0 && props.form.newFalseAnswer.trim().length > 0){
      props.disableChange(props);
    }
  }, [newQuestion, newTrueAnswer, newFalseAnswer]);

  const onChange = (evt) => {
    const field = evt.target.id;
    const value = evt.target.value
    props.inputChange(field, value, props);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    props.postQuiz(props);
    props.resetForm();
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={(evt) => onChange(evt, props)} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion}/>
      <input maxLength={50} onChange={(evt) => onChange(evt, props)} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer}/>
      <input maxLength={50} onChange={(evt) => onChange(evt, props)} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer}/>
      <button id="submitNewQuizBtn" disabled={props.form.submitQuizDisabled} onClick={onSubmit}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    form: state.form,
    message: state.infoMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postQuiz: (props) => dispatch(postQuiz(props)),
    setQuiz: () => dispatch(setQuiz()),
    inputChange: (field, value, props) => dispatch(inputChange(field, value, props)),
    disableChange: (props) => dispatch(disableChange(props)),
    resetForm: () => dispatch(resetForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
