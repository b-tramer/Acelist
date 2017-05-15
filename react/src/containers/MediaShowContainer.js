import React, { Component } from 'react';
import { Link } from 'react-router';
import MediaShow from '../components/MediaShow';

class MediaShowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      media_type: '',
      media_data_id: 0,
      genres: [],
      production_companies: [],
    }
  }

  componentDidMount() {
    this.getMediaData()
  }

  // in order to fetch from the detailed api, I need to get 1) media type and 2) data_id
  getMediaData() {
    let media_id = +(this.props.params.id)
    fetch(`/api/v1/media/${media_id}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ media_type: responseData.media_type, media_data_id: responseData.media_data_id })
    });
  }

  render() {
    return(
      <div>
        <MediaShow
          media_type = {this.state.media_type}
          media_data_id = {this.state.media_data_id}
        />
      </div>
    )
  }
}

export default MediaShowContainer
