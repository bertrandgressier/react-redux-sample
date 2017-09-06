import * as React from 'react';
import { FormEvent } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
// import * as Loader from 'react-loaders';
import { loggingIn, LoginActionTypes, logout } from './login.action';
import { ApplicationStore } from '../../../react-redux-sample/src/root.type';

interface LoginStateProps {
  authenticated: boolean;
  name: string;
  error?: object;
  logging: boolean;
}
const mapStateToProps = (store: ApplicationStore): LoginStateProps => ({
  authenticated: store.user.authenticated,
  name: store.user.name,
  logging: store.user.logging,
  error: store.user.error
});

interface LoginDispatchProps {
  loginAction: Function;
  logoutAction: Function;
}
const mapDispatchToProps = (dispatch: Dispatch<LoginActionTypes>): LoginDispatchProps => ({
  loginAction: (username: string, password: string) => dispatch(loggingIn(username, password)),
  logoutAction: () => dispatch(logout()),
});

interface LoginState {
  username: string;
  password: string;
}

export class Login extends React.Component<LoginStateProps & LoginDispatchProps, LoginState> {

  constructor(props: LoginStateProps & LoginDispatchProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: FormEvent<FormControl>) {
    let target = event.target as HTMLInputElement;
    this.setState({
        ...this.state,
      [target.name]: target.value,
    });
  }

  render() {

    const { authenticated, name, error, logging, logoutAction, loginAction } = this.props;

    if (authenticated) {
      return (
        <div>Hello {name}. Do you want to logout ? <Button onClick={() => logoutAction()}>Logout</Button></div>
      );
    }

    if (logging) {
      return (
        <div style={{ textAlign: 'center' }}>
          {/* <Loader type="line-scale" active={true} color="green" /> */}
          Loading ...
        </div>);
    }

    return (

      <Form horizontal={true}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl
              name="username"
              type="email"
              placeholder="Type your Username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
              placeholder="Password"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button
              type="submit"
              onClick={event => {
                event.preventDefault();
                loginAction(this.state.username, this.state.password);
              }}
            >
              Sign in
            </Button>
          </Col>
        </FormGroup>

        {error && (
          <Alert bsStyle="danger">
            <h4>Oh snap! You got an error!</h4>
            <p>{error['description']}</p>
          </Alert>
        )}

      </Form>
    );
  }
}

export default connect<LoginStateProps, LoginDispatchProps, void>(mapStateToProps, mapDispatchToProps)(Login);