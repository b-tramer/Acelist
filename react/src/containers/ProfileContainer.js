import React, { Component } from 'react';
import { Link } from 'react-router';

class ProfileContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      media: {}
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch(`/api/v1/lists/1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({media: responseData})
      });
  }

  render() {
    return(
      <div>
      </div>

    )
  }
}

export default ProfileContainer
