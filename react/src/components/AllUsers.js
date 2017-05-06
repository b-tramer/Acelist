import React from 'react'
import MediaCard from '../components/MediaCard'
import SearchBox from '../components/SearchBox'
import UserCard from '../components/UserCard'

class AllUsers extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    let users = this.props.users.map((user) => {
      return (
        <UserCard
          key = {user.id}
          id = {user.id}
          image = {user.image}
          name = {user.name}
          city = {user.city}
          state = {user.state}
        />
      )
    })

    return(
      <div className="about">
        {users}
      </div>
    )
  }

}

export default AllUsers
