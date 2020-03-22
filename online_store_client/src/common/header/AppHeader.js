import React, {PureComponent} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './AppHeader.css';
import pollIcon from '../../img/poll.svg';
import {Avatar, Dropdown, Layout, Menu} from 'antd';
import {getAvatarColor} from "../../util/Colors";

import {localizedStrings} from "../../util/Localization";
import Button from "antd/es/button";

import {isAdmin} from "../../app/App";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import CaretDownOutlined from "@ant-design/icons/lib/icons/CaretDownOutlined";
import ShoppingCartOutlined from "@ant-design/icons/lib/icons/ShoppingCartOutlined";


const Header = Layout.Header;

class AppHeader extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language
        }
    }

    handleMenuClick = ({key}) => {
        if (key === "logout") {
            this.props.onLogout();
        }
    };

    makeMenuForUser = () => {
        return [
            <Menu.Item key="/add">
                    <span className={
                        isAdmin(this.props.currentUser) ? '' : 'custom-hidden'}>
                        <Link to="/add">
                            <img src={pollIcon} alt="poll" className="poll-icon"/>
                        </Link>
                    </span>
            </Menu.Item>,

            <Menu.Item key="/">
                <Link to="/">
                    <HomeOutlined style={{fontSize: '20px'}}/>
                </Link>
            </Menu.Item>,

            <Menu.Item key="/basket">
                <Link
                    to={'/user/' + this.props.currentUser.id + '/basket'}>
                    <ShoppingCartOutlined style={{fontSize: '20px'}}/>
                </Link>
            </Menu.Item>,


            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu
                    currentUser={this.props.currentUser}
                    handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>
        ];
    };

    makeMenuForGuest = () => {
        return [
            <Menu.Item key="/login">
                <Link to="/login">
                    {localizedStrings.login}
                </Link>
            </Menu.Item>,
            <Menu.Item key="/sign-up">
                <Link to="/sign-up">
                    {localizedStrings.signUp}
                </Link>
            </Menu.Item>
        ]
    };

    updateLanguage = (lang) => {

        this.setState({
            language: lang
        });

        this.props.handleLanguageChange(lang);
    };

    render() {
        let menuItems;

        if (this.props.currentUser) {
            menuItems = this.makeMenuForUser();
        } else {
            menuItems = this.makeMenuForGuest();
        }

        console.log('this.props.language', this.props.language)
        console.log('this.state.language', this.state.language)
        console.log('this.state.curUser', this.state.currentUser)

        return (

            <Header className="app-header">
                <div className="base-container">
                    <div className="app-title">
                        <Link to="/">
                            {localizedStrings.certificates}
                        </Link>
                    </div>

                    <span className="app-language-position">

        <Button className={
            this.state.language === 'ru' ? 'app-language app-language-style app-language-selected' : 'app-language app-language-style'}
                onClick={() => this.updateLanguage('ru')}>
        RU
        </Button>
        /
        <Button className={
            this.state.language === 'en' ? 'app-language app-language-style app-language-selected' : 'app-language app-language-style'}
                onClick={() => this.updateLanguage('en')}>
        EN
        </Button>
        </span>

                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {menuItems}
                    </Menu>

                </div>

            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const image = props.currentUser.imageUrl ? (
        <img src={props.currentUser.imageUrl} alt={props.currentUser.name}/>
    ) : (
        <div className="text-avatar">
            <span>{props.currentUser.name && props.currentUser.name[0]}</span>
        </div>
    );
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <Avatar className="user-avatar-circle"
                        icon={image}
                        style={{backgroundColor: getAvatarColor(props.currentUser.name)}}>
                    {props.currentUser.name[0].toUpperCase()}
                </Avatar>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to="/profile">
                    {localizedStrings.profile}
                </Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                {localizedStrings.logout}
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <UserOutlined style={{marginRight: 0, fontSize: '20px'}}/>
                <CaretDownOutlined/>
            </a>
        </Dropdown>
    );
}


export default withRouter(AppHeader);