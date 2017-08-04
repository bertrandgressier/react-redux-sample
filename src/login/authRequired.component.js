import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {unAuthorized} from '../login/login.action';
import {withRouter} from 'react-router-dom';

class AuthRequired extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    redirectToLogin: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  };

  componentWillMount() {
    let {user, redirectToLogin, location} = this.props;
    if (!user.authenticated) {
      redirectToLogin(location.pathname);
    }
  }

  render() {
    return (<div/>);
  }
}

export default withRouter(connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    redirectToLogin: (pathname) => dispatch(unAuthorized(pathname)),
  }),
)(AuthRequired));