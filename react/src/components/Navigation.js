import React, { Component } from 'react';
import { Link } from 'react-router';
// import styles from '../styles/Navigation';

class Navigation extends Component{
  constructor(props){
    super(props);
    this.state = {}

  }

  render() {

    return(
    <div>

    <div className="show-for-small-only">
      <div className="nav-bar-div">

        <div className='row'>
          <div onClick={this.props.handleClick}>
            <div className="small-3 large-1 columns" id='menu-icon-div'>
              <span id='nav-menu-icon'> <img src={this.props.menuButton}/></span>
            </div>
          </div>

          <div className="small-6 large-10 columns" id="logo-center">
            <span id='nav-logo-mobile'> <Link to='/'> <img src="./ace-logo-three.png" height="150" width="162"/> </Link> </span>
          </div>

          <div className="small-3 large-1 columns profile" id='menu-profile-div'>
            <span id='nav-profile-icon'> <img src="./profile-icon.svg" height="36" width="35"/> </span>
          </div>
        </div>
      </div>

      <div id="dropdown-menu"onClick={this.props.handleClick} className={this.props.className}>
        <div className="mobile-menu dropdown" id="example-menu">
          <ul className="vertical menu" data-accordion-menu>
            <li className="list-item"> <Link to='/'>HOME</Link> </li>
            <li className="list-item"> <Link to='/movie'>SEARCH</Link> </li>
            <li className="list-item"> <Link to='/signup'>PROFILE</Link> </li>
            <li className="list-item"> <Link to='/signup'>SIGNUP</Link> </li>
          </ul>
        </div>
      </div>

    </div>


      <div className="show-for-medium">
        <div className="nav-bar-div">

          <div className='row'>
            <div onClick={this.props.handleClick}>
              <div className="small-3 large-1 columns" id='menu-icon-div'>
                <span id='nav-menu-icon'> <img src={this.props.menuButton}/></span>
              </div>
            </div>

            <div className="small-6 large-10 columns" id="logo-center">
              <span id='nav-logo'> <Link to='/'> <img src="./ace-logo-three.png" height="150" width="220"/> </Link> </span>
            </div>

            <div className="small-3 large-1 columns profile" id='menu-profile-div'>
              <span id='nav-profile-icon'> <img src="./profile-icon.svg" height="36" width="35"/> </span>
            </div>
          </div>
        </div>

        <div id="dropdown-menu"onClick={this.props.handleClick} className={this.props.className}>
          <div className="mobile-menu dropdown" id="example-menu">
            <ul className="vertical menu" data-accordion-menu>
              <li className="list-item"> <Link to='/'>HOME</Link> </li>
              <li className="list-item"> <Link to='/movie'>SEARCH</Link> </li>
              <li className="list-item"> <Link to='/user'>PROFILE</Link> </li>
              <li className="list-item"> <Link to='/signup'>SIGNUP</Link> </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    )
  }
}

export default Navigation
