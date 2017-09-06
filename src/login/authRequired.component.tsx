import * as React from 'react';
import { connect } from 'react-redux';
import { unAuthorized } from '../login/login.action';
import { Dispatch } from 'redux';
import { ApplicationStore, LoginState } from '../../../react-redux-sample/src/root.type';
import { RouterAction } from 'react-router-redux';
import { Location } from 'history';

interface AuthRequiredProps {
    user: LoginState;
    location: Location | null;
}

interface AuthRequiredDispatch {
    redirectToLogin: Function;
}

class AuthRequired extends React.Component<AuthRequiredProps & AuthRequiredDispatch> {

    componentWillMount() {
        let {user, redirectToLogin, location} = this.props;
        if (!user.authenticated) {
            redirectToLogin(location ? location.pathname : '');
        }
    }

    render() {
        return (<div/>);
    }
}

export default connect<AuthRequiredProps, AuthRequiredDispatch, void>(
    (state: ApplicationStore): AuthRequiredProps => ({
        user: state.user,
        location: state.router.location
    }),
    (dispatch: Dispatch<RouterAction>): AuthRequiredDispatch => ({
        redirectToLogin: (pathname: string) => dispatch(unAuthorized(pathname)),
    })
)(AuthRequired);