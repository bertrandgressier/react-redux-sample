import * as React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { History } from 'history';

interface HeaderProps {
  history: History;
}

class Header extends React.Component<HeaderProps, {}> {

  render() {

    let { history } = this.props;

    return (
      <div>
        <Navbar inverse={true}>
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

export default Header;