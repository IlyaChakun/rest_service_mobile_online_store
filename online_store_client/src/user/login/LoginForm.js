import React, {Component} from "react";
import {login} from "../../util/APIUtils";
import {ACCESS_TOKEN} from "../../constants";
import {Button, Form, Input, notification, Tooltip} from "antd";
import {localizedStrings} from "../../util/Localization";
import {Link} from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import SocialLogin from "./SocialLogin";

import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";


class LoginForm extends Component {

    state = {
        email: '',
        password: ''
    };

    handleSubmit = () => {
        const loginRequest = {
            email: this.state.email,
            password: this.state.password
        };
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.onLogin();
            }).catch(() => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: localizedStrings.alertWrongEmailOrPassword
            });
        });
    };


    handleEmailChange = (event) => {
        const value = event.target.value;
        this.setState({
            email: value
        });
    };

    handlePasswordChange = (event) => {
        const value = event.target.value;
        this.setState({
            password: value
        });
    };


    render() {

        return (
            <Form onFinish={this.handleSubmit}
                  className="login-form">

                <SocialLogin/>

                <FormItem
                    className="product-form-row"
                    name={"email"}
                    rules={[
                        {
                            type: 'email',
                            message: 'Email обязателен!',
                            required: true,
                        }
                    ]}
                    onChange={this.handleEmailChange}>
                    <Input
                        prefix={<UserOutlined/>}
                        name="email"
                        placeholder={localizedStrings.email}/>
                </FormItem>

                <FormItem
                    className="product-form-row"
                    name={"password"}
                    rules={[
                        {
                            message: 'Пароль обязательно!',
                            required: true,
                        },
                    ]}
                    onChange={this.handlePasswordChange}>

                    <Input.Password
                        prefix={<LockOutlined/>}
                        name="password"
                        type="password"
                        placeholder={localizedStrings.password}/>
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">
                        {localizedStrings.login}
                    </Button>
                    {localizedStrings.or}
                    <Link to="/sign-up">
                        {localizedStrings.loginFormRegisterNow}
                    </Link>
                </FormItem>
            </Form>
        );
    }
}


export default LoginForm;