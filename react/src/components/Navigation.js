import React, { Component } from 'react';
import { Link } from 'react-router';
// import styles from '../styles/Navigation';

class Navigation extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getUserData()
  }

  // get current users id so that when top right profile is clicked, it will be directed to their profile
  getUserData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ userId: responseData.current_user.id, userImage:responseData.current_user.image  })
    });
  }

  render() {
    let userId = this.state.userId
    let profileImage;
    if (this.state.userImage) {
      profileImage = this.state.userImage
    } else {
      profileImage = assetHelper["profile-icon.svg"]
    }
    return(
    <div>

    <div className="show-for-small-only">
      <div className="nav-bar-div">
        <div className='row'>
          <div onClick={this.props.handleClick}>
            <div className="small-3 large-1 columns" id='menu-icon-div'>
              <span id='nav-menu-icon'> <img src={assetHelper[this.props.menuButton]}/></span>
            </div>
          </div>

          <div className="small-6 large-10 columns" id="logo-center">
            <span id='nav-logo-mobile'> <Link to='/'> <img src={assetHelper["ace-logo.png"]} height="150" width="162"/> </Link> </span>
          </div>

          <div className="small-3 large-1 columns profile" id='menu-profile-div'>
            <span id='nav-profile-icon'> <Link to={`/users/${userId}`}> <img src={profileImage} height="36" width="35"/> </Link> </span>
          </div>
        </div>
      </div>

      <div id="dropdown-menu"onClick={this.props.handleClick} className={this.props.className}>
        <div className="mobile-menu dropdown" id="example-menu">
          <ul className="vertical menu" data-accordion-menu>
            <li className="list-item"> <Link to='/'>HOME</Link> </li>
            <li className="list-item"> <Link to='/users'>SEARCH USERS</Link> </li>
            <li className="list-item"> <Link to={`/users/${userId}`}>PROFILE</Link> </li>
            <li className="list-item"> <a href="/login">LOGIN/SIGNUP</a> </li>
          </ul>
        </div>
      </div>

    </div>

      <div className="show-for-medium">
        <div className="nav-bar-div">

          <div className='row'>
            <div onClick={this.props.handleClick}>
              <div className="small-3 large-1 columns" id='menu-icon-div'>
                <span id='nav-menu-icon'> <img src={assetHelper[this.props.menuButton]}/></span>
              </div>
            </div>

            <div className="small-6 large-10 columns" id="logo-center">
              <span id='nav-logo'> <Link to='/'> <img src={assetHelper["ace-logo.png"]} height="150" width="220"/> </Link> </span>
            </div>

            <div className="small-3 large-1 columns profile" id='menu-profile-div'>
              <span id='nav-profile-icon'> <Link to={`/users/${userId}`}> <img src={profileImage} height="36" width="35"/> </Link> </span>
            </div>
          </div>
        </div>

        <div id="dropdown-menu"onClick={this.props.handleClick} className={this.props.className}>
          <div className="mobile-menu dropdown" id="example-menu">
            <ul className="vertical menu" data-accordion-menu>
              <li className="list-item"> <Link to='/'>HOME</Link> </li>
              <li className="list-item"> <Link to='/users'>SEARCH USERS</Link> </li>
              <li className="list-item"> <Link to={`/users/${userId}`}>PROFILE</Link> </li>
              <li className="list-item"> <a href="/login">LOGIN/SIGNUP</a> </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    )
  }
}

export default Navigation
