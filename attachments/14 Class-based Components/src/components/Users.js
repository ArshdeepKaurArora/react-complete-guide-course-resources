import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showUsers: true,
    };
  }

  toggleUsersHandler = () => {
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    })
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.props.users) {
      this.setState({users: this.props.users})
    }

    if (this.props.users.length === 0) {
      throw new Error('No users found!');
    }
  }

  render() {
    const usersList = (
      <ul>
        {this.state.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

export default Users;
