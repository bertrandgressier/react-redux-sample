import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Grid } from 'react-bootstrap';
import { History } from 'history';

import Header from './header.component';
import Login from '../login/login.component';
import SearchFrame from '../searchPanel/searchFrame.component';

interface AppProps {
  history: History;
}

export class App extends React.Component<AppProps> {

  render() {

    let { history } = this.props;

    return (
      <ConnectedRouter history={history}>
        <Grid>
          <Header history={this.props.history} />
          <Switch>
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/search" component={SearchFrame} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Grid>
      </ConnectedRouter>
    );
  }
}