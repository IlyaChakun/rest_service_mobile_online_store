import React, {Component} from 'react';
import './AppFooter.css';
import {Layout} from "antd";
import {localizedStrings} from "../../util/Localization";

const Footer = Layout.Footer;

class AppFooter extends Component {

    render() {
        return (
            <Footer className="app-footer">
                <div className="app-footer-end-page">
                    <a>
                        {localizedStrings.certificates}
                    </a>
                    {localizedStrings.footerText}
                </div>
            </Footer>
        )
    }
}


export default AppFooter;