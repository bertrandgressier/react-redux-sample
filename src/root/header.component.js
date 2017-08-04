import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {

    let {history} = this.props;

    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">People search</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} onClick={e => history.push('/login')}> Login</NavItem>
              <NavItem eventKey={2} onClick={e => history.push('/search')}>Search</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(connect()(Header));