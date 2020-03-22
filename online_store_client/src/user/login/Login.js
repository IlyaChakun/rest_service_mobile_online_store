import React, {Component} from 'react';
import './Login.css';

import {Form, notification} from 'antd';
import welcomePicture from '../../img/roger-bradshaw-Yd1IJocQdHo-unsplash.jpg';
import {localizedStrings} from "../../util/Localization";
import LoginForm from "./LoginForm";


class Login extends Component {

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.error) {
            this.showAlertMessage();
        }
    }

    showAlertMessage = () => {
        setTimeout(() => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: this.props.location.state.error,
                duration: 5000
            });
            this.props.history.replace({
                pathname: this.props.location.pathname,
                state: {}
            });
        }, 100);
    };


    render() {
        return (
            <div>
                <h1 className="page-title">
                    <div className="page-title-text">
                        {localizedStrings.shopName}
                    </div>
                </h1>
                <div className="login-container">
                    <div className="login-content">
                        <LoginForm onLogin={this.props.onLogin}/>
                    </div>
                </div>
                <div className="welcome-picture">
                    <img src={welcomePicture} width="600px" height="500px " alt={"welcome"}/>
                </div>
            </div>
        );
    }
}


export default Login;