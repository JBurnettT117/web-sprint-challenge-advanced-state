import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer, postQuiz } from '../state/action-creators';

function Quiz(props) {

  useEffect(() => {
    if(props.quiz.quiz_id === null){
      props.fetchQuiz(props);
    }
  }, []);

  const handleAnswerSubmit = (props) => {
    props.postAnswer(props);
  };

  const handleNewQuizSubmit = () => {

    props.postQuiz();
  }
  
  return (
    <div id="wrapper">
      {
        props.quiz.isDoneFetching ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${props.selectedAnswer.firstAnswerSelected ? "selected" : ""}`}>
                {props.quiz.answerOneText}
                <button onClick={() => {props.selectAnswer(props, 1)}}>
                {props.selectedAnswer.firstAnswerSelected ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={`answer ${props.selectedAnswer.secondAnswerSelected ? "selected" : ""}`}>
                {props.quiz.answerTwoText}
                <button onClick={() => {props.selectAnswer(props, 2)}}>
                {props.selectedAnswer.secondAnswerSelected ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={props.selectedAnswer.firstAnswerSelected || props.selectedAnswer.secondAnswerSelected ? false : true} onClick={() =>{handleAnswerSubmit(props)}}>Submit answer</button>{/**needs to be disabled unless value.trim() or whatever is > 0 */}
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    message: state.infoMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuiz: (props) => dispatch(fetchQuiz(props)),
    postAnswer: (props) => dispatch(postAnswer(props)),
    postQuiz: () => dispatch(postQuiz()),
    selectAnswer: (props, answerId) => dispatch(selectAnswer(props, answerId)),
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Quiz)