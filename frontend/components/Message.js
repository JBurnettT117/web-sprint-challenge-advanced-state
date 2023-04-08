import React from 'react'
import { connect } from 'react-redux';

function Message(props) {
  return <div id="message">{props.message.message}</div>
}

const mapStateToProps = (state) => {
  return {
    ...state,
    message: state.infoMessage
  }
}

export default connect (mapStateToProps)(Message)