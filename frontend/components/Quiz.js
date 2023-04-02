import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer, postQuiz } from '../state/action-creators';

function Quiz(props) {

  useEffect(() => {
    props.fetchQuiz()
  }, []);

  const handleAnswerSubmit = () => {

    props.postAnswer();
  };

  const handleNewQuizSubmit = () => {

    props.postQuiz();//this might be for the form tab and not this tab
  }
  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz.isDoneFetching ? (
          <>
            <h2>{props.quiz.question}</h2>{/*question goes here */}

            <div id="quizAnswers">
              <div className={`answer ${props.selectedAnswer.firstAnswerSelected ? "selected" : ""}`}>
                {props.quiz.answerOneText}{/**first answer goes here */}
                <button onClick={() => {props.selectAnswer(props, 1)}}>
                {props.selectedAnswer.firstAnswerSelected ? "SELECTED" : "Select"}{/**selected option should go here. */}
                </button>
              </div>

              <div className={`answer ${props.selectedAnswer.secondAnswerSelected ? "selected" : ""}`}>
                {props.quiz.answerTwoText}{/**second answer option goes here */}
                <button onClick={() => {props.selectAnswer(props, 2)}}>
                {props.selectedAnswer.secondAnswerSelected ? "SELECTED" : "Select"}{/**selected option should go here */}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>{/**needs to be disabled unless value.trim() or whatever is > 0 */}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuiz: () => dispatch(fetchQuiz()),
    postAnswer: () => dispatch(postAnswer()),
    postQuiz: () => dispatch(postQuiz()),
    selectAnswer: (props, answerId) => dispatch(selectAnswer(props, answerId)),
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Quiz,)