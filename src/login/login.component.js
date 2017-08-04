import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Button} from 'react-bootstrap';
import {loggingIn, logout} from './login.action';

class Login extends Component {

  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    name: PropTypes.string,
    login: PropTypes.func,
    logout: PropTypes.func,
  };

  render() {

    let {authenticated, name, logout, login} = this.props;

    return (
      <div>
        {authenticated ? (
          <span>You are authenticated {name} <Button onClick={logout}>Logout</Button></span>
        ):(
          <span>You are not authenticated. <Button onClick={login} bsStyle="primary">Login</Button></span>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    authenticated: state.user.authenticated,
    name: state.user.name,
  }),
  dispatch => ({
    login: (response) => dispatch(loggingIn('fakeuser', 'fakepassword')),
    logout: () => dispatch(logout()),
  }),
)(Login);