import React, {Component} from 'react';
import {ACCESS_TOKEN, ERROR} from '../../constants';
import {Redirect, withRouter} from 'react-router-dom'

class OAuth2RedirectHandler extends Component {

    constructor(props) {
        super(props);

        this.setTokenAndRedirect = this.setTokenAndRedirect.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
    }


    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter(ERROR);
        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            this.props.onLogin();
            return <Redirect to={{
                pathname: "/",
                state: {from: this.props.location}
            }}/>;
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: {
                    from: this.props.location,
                    error: error
                }
            }}/>;
        }
    }

    redirectToLogin(error) {
        return <Redirect to={{
            pathname: "/login",
            state: {
                from: this.props.location,
                error: error
            }
        }}/>;
    }

    setTokenAndRedirect(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        this.props.onLogin();
        return <Redirect to={{
            pathname: "/",
            state: {from: this.props.location}
        }}/>;
    }

}

export default withRouter(OAuth2RedirectHandler);

