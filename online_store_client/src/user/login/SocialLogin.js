import React, {Component} from "react";
import FormItem from "antd/es/form/FormItem";
import {GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../constants";
import googleLogo from "../../img/google-logo.png";
import {localizedStrings} from "../../util/Localization";
import githubLogo from "../../img/github-logo.png";

class SocialLogin extends Component {
    render() {
        return (
            <FormItem>
                <FormItem>
                    <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                        <img src={googleLogo} alt="Google"/>
                        {localizedStrings.logInWithGoogle}
                    </a>
                </FormItem>
                <FormItem>
                    <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                        <img src={githubLogo} alt="Github"/>
                        {localizedStrings.logInWithGithub}
                    </a>
                </FormItem>
            </FormItem>
        );
    }
}

export default SocialLogin;