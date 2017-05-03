import React, { Component } from 'react';
import { Link } from 'react-router';
import MainContainer from './MainContainer'

class HeroContainer extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    return(
      <div>
        <div className='information'>
          <div className='row'>
              <div className='hero-text'>
                <h1> Life’s Better Listed </h1>
                <h4> Rank & share your favorite movies & shows </h4>
               <button type="button" className="button" id="get-started-button">GET STARTED</button>
              </div>
          </div>
        </div>

        <MainContainer />



      </div>

    )
  }
}

export default HeroContainer
