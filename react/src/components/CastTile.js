import React from 'react'

class CastTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }


  render() {
    let cast = this.props.cast.map((person) => {
      return(
        <div>
          <img src={person.image} height="50px" width="50px"/>
          <h3> {person.name} </h3>
          <p> {person.character_name} </p>
        </div>
      )
    })


    return(
      <div>
        {cast}
      </div>
    )
  }
}

export default CastTile
