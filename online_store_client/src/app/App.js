import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';

import {getCurrentUser} from '../util/APIUtils';
import {ACCESS_TOKEN, LANGUAGE, SUCCESS, USER_ID} from '../constants';

import Login from '../user/login/Login';
import SignUp from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/header/AppHeader';
import NotFound from '../common/error/NotFound';
import LoadingIndicator from '../common/util/LoadingIndicator';
import PrivateRoute from './util/PrivateRoute';

import {Layout, notification} from 'antd';
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import AppFooter from "../common/footer/AppFooter";


import {localizedStrings} from "../util/Localization";
import ProductList from "../product/ProductList";
import AddProduct from "../product/action/AddProduct";
import EditProduct from "../product/action/EditProduct";
import PrivateAdminRoute from "./util/PrivateAdminRoute";
import Basket from "../product/basket/Basket";


const {Content} = Layout;


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,

            isLoading: false,

            language: localStorage.getItem(LANGUAGE) === null ? 'en' : localStorage.getItem(LANGUAGE)
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleNoPermissions = this.handleNoPermissions.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 5,
        });
    }


    handleLanguageChange(lang) {
        localStorage.setItem(LANGUAGE, lang);
        this.setState(() => ({
            language: lang
        }));
        localizedStrings.setLanguage(this.state.language);
    }


    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(() => {
            this.setState({
                isLoading: false
            });
        });

    }


    componentDidMount() {
        this.loadCurrentUser();
    }


    handleLogout(redirectTo = "/", notificationType = SUCCESS, description = localizedStrings.alertSuccessLogOut) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER_ID);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: localizedStrings.alertAppName,
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: localizedStrings.alertAppName,
            description: localizedStrings.alertSuccessLogin,
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    handleNoPermissions() {
        notification.error({
            message: localizedStrings.alertAppName,
            description: localizedStrings.alertNoPermission
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render() {

        console.log('base render works', this.state.isLoading);

        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }


        return (
            <Layout className="app-container">

                <AppHeader isAuthenticated={this.state.isAuthenticated}
                           currentUser={this.state.currentUser}
                           onLogout={this.handleLogout}
                           language={this.state.language}
                           handleLanguageChange={this.handleLanguageChange}/>

                <Content className="app-content">
                    <div className="base-container">
                        <Switch>


                            <Route exact path="/"
                                   render={(props) =>
                                       <ProductList isAuthenticated={this.state.isAuthenticated}
                                                    currentUser={this.state.currentUser}
                                                    handleLogout={this.handleLogout}
                                                    {...props} />}/>

                            <PrivateAdminRoute path="/add"
                                               authenticated={this.state.isAuthenticated}
                                               currentUser={this.state.currentUser}
                                               component={AddProduct}
                                               handleLogout={this.handleLogout}/>

                            <PrivateAdminRoute path="/edit/:id"
                                               authenticated={this.state.isAuthenticated}
                                               currentUser={this.state.currentUser}
                                               component={EditProduct}
                                               handleLogout={this.handleLogout}/>


                            <PrivateRoute path="/profile"
                                          authenticated={this.state.isAuthenticated}
                                          currentUser={this.state.currentUser}
                                          component={Profile}/>

                            <Route path="/user/:id/basket"
                                   authenticated={this.state.isAuthenticated}
                                   currentUser={this.state.currentUser}
                                   handleLogout={this.handleLogout}
                                   component={Basket}/>

                            <Route path="/login"
                                   render={(props) =>
                                       <Login onLogin={this.handleLogin}
                                              {...props} />}/>

                            <Route path="/sign-up"
                                   render={(props) =>
                                       <SignUp
                                           authenticated={this.state.isAuthenticated}
                                           {...props} />}/>

                            <Route path="/oauth2/redirect"
                                   render={(props) =>
                                       <OAuth2RedirectHandler onLogin={this.handleLogin}
                                                              {...props} />}/>

                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Content>

                <AppFooter/>
            </Layout>

        );
    }
}

/*

  <Route path="/basket"
                                   render={(props) =>
                                       <Basket
                                           authenticated={this.state.isAuthenticated}
                                           currentUser={this.state.currentUser}
                                           handleLogout={this.handleLogout}
                                           {...props} />}/>


 <Route path="/basket"
                                   authenticated={this.state.isAuthenticated}
                                   currentUser={this.state.currentUser}
                                   handleLogout={this.handleLogout}
                                   component={Basket}/>
 */

export function isAdmin(currentUser) {
    if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
        const role = currentUser.roles.find((elem) => {
            if (elem.name === 'ROLE_ADMIN') {
                return elem.name;
            }
        });
        return role === undefined ?
            false :
            role.name === 'ROLE_ADMIN';
    }
    return false;
}


export function isUser(currentUser) {
    if (currentUser !== null && currentUser !== undefined && currentUser.roles !== undefined) {
        const role = currentUser.roles.find((elem) => {
            if (elem.name === 'ROLE_USER') {
                return elem.name;
            }
        });
        return role === undefined ?
            false :
            role.name === 'ROLE_USER';
    }
    return false;
}

export default withRouter(App);
