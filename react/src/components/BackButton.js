import React from 'react';
import { browserHistory } from 'react-router'

const BackButton = () => {
  return(
    <button onClick={browserHistory.goBack} id='show-back-button'>← PROFILE</button>
  )
}

export default BackButton;
