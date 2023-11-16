import React from 'react';
import { connect } from 'react-redux';

import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {

  const { activeCog, moveClockwise, moveCounterClockwise } = props;
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={`cog ${activeCog === 0 ? ' active' : ''}`} style={{ "--i": 0 }}>{activeCog === 0 ? "B" : ""}</div>
        <div className={`cog ${activeCog === 1 ? ' active' : ''}`} style={{ "--i": 1 }}>{activeCog === 1 ? "B" : ""}</div>
        <div className={`cog ${activeCog === 2 ? ' active' : ''}`} style={{ "--i": 2 }}>{activeCog === 2 ? "B" : ""}</div>
        <div className={`cog ${activeCog === 3 ? ' active' : ''}`} style={{ "--i": 3 }}>{activeCog === 3 ? "B" : ""}</div>
        <div className={`cog ${activeCog === 4 ? ' active' : ''}`} style={{ "--i": 4 }}>{activeCog === 4 ? "B" : ""}</div>
        <div className={`cog ${activeCog === 5 ? ' active' : ''}`} style={{ "--i": 5 }}>{activeCog === 5 ? "B" : ""}</div>
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => {moveCounterClockwise(activeCog)}} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => {moveClockwise(activeCog)}} >Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeCog: state.wheel.activeCog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveClockwise: (index) => dispatch(moveClockwise(index)),
    moveCounterClockwise: (index) => dispatch(moveCounterClockwise(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wheel)
