import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {Grid} from 'react-bootstrap';

import Header from './header.component';
import SearchFrame from '../searchPanel/searchFrame.component';
import Login from '../login/login.component';

export class App extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Grid>
          <Header/>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/search" component={SearchFrame}/>
            <Redirect from="/" to="/login"/>
          </Switch>
        </Grid>
      </ConnectedRouter>
    );
  }
}