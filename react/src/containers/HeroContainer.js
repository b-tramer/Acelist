import React, { Component } from 'react';
import { Link } from 'react-router';
import InfoArea from '../components/InfoArea'

class HeroContainer extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getUserData()
  }

  // get current users id so that when 'get started' button is clicked, it either directs to their profile or, if they aren't signed in, the ability to sign in or sign up
  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ user: responseData.current_user.id })
    });
  }

  render() {
    let userId = this.state.user
    return(
      <div>
        <div className='information'>
          <div className='row'>
              <div className='hero-text'>
                <h1> Life’s Better Listed </h1>
                <h4> Save & share your favorite movies & shows </h4>
                <Link to={`/users/${userId}`}>
               <button type="button" className="button" id="get-started-button">GET STARTED</button>
               </Link>
              </div>
          </div>
        </div>
        <InfoArea />
      </div>

    )
  }
}

export default HeroContainer
