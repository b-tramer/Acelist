import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

class InfoArea extends Component {

  render() {
    return(
      <div>
        <div className="row" id="info-area">
          <div className="small-12 large-4 columns">
            <img src="./search.svg" height="90" width="90"/>
            <h5> Search Movies & Shows </h5>
          </div>

          <div className="small-12 large-4 columns">
            <img src="./list.svg" height="90" width="90"/>
            <h5> Create Custom Lists </h5>
          </div>

          <div className="small-12 large-4 columns">
            <img src="./share.svg" height="90" width="90"/>
            <h5> Save & Share With Friends </h5>
          </div>
        </div>

        <div id="started-area">
        <Link to='/users/undefined'> <h6> <button type="button" className="button" id="get-started-button-info">GET STARTED</button> </h6> </Link>
        </div>
      </div>
    )
  }
}

export default InfoArea;
