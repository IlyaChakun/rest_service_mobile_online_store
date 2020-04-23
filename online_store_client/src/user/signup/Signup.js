import React, {Component} from 'react';
import {checkEmailAvailability, signUp} from '../../util/APIUtils';
import './Signup.css';
import {Link} from 'react-router-dom';
import {
    EMAIL_MAX_LENGTH,
    ERROR,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    SUCCESS
} from '../../constants';

import {Button, Form, Input, notification, Upload} from 'antd';
import {localizedStrings} from "../../util/Localization";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import FormItemLabel from "antd/es/form/FormItemLabel";
import {beforeUpload, getBase64} from "../../util/PictureLoaderUtil";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import {InboxOutlined} from "@ant-design/icons";

const FormItem = Form.Item;
const {Dragger} = Upload;

class Signup extends Component {

    state = {
        loading: false,
        imageUrl: '',
        name: {
            value: ''
        },
        email: {
            value: ''
        },
        password: {
            value: ''
        },
        confirmedPassword: {
            value: ''
        }
    };


    handleInputChange = (event, validationFun) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    };

    handleSubmit = () => {


        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            password: this.state.password.value,
            confirmedPassword: this.state.confirmedPassword.value,
            imageUrl: this.state.imageUrl
        };

        signUp(signupRequest)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: localizedStrings.alertSuccessRegister,
                });
                this.props.history.push("/login");
            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: error.message || localizedStrings.alertException
            });
        });
    };

    isFormInvalid = () => {
        return !(this.state.name.validateStatus === SUCCESS &&
            this.state.email.validateStatus === SUCCESS &&
            this.state.password.validateStatus === SUCCESS &&
            this.state.confirmedPassword.validateStatus === SUCCESS
        );
    };

    render() {

        const uploadButton = (
            <div>
                {
                    this.state.loading ?
                        <LoadingOutlined/> :
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                }
            </div>
        );


        return (
            <div className="signup-container">

                <div>
                    <h1 className="page-title">
                        {localizedStrings.signUp}
                    </h1>
                </div>


                <Form {...layout}
                      onFinish={this.handleSubmit}>

                    <div className="aside-picture">
                        <Dragger
                            name="file"
                            listType="picture"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleUploadImage}>

                            {this.state.imageUrl ?
                                <img src={this.state.imageUrl} alt="avatar" style={{width: '100%'}}/> :
                                uploadButton
                            }

                            <p className="ant-upload-text">
                                Нажмите для выбора картинки
                            </p>
                        </Dragger>
                    </div>

                    <div className="content-container">

                        <FormItem
                            label={localizedStrings.name}
                            hasFeedback
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input
                                name="name"
                                autoComplete="off"
                                placeholder={localizedStrings.name}
                                value={this.state.name.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                        </FormItem>


                        <FormItem
                            label={localizedStrings.email}
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                prefix={<UserOutlined/>}
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder={localizedStrings.helpForEmail}
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)}/>
                        </FormItem>
                        <FormItem
                            label={localizedStrings.password}
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input.Password
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder={localizedStrings.helpForPass}
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}/>
                        </FormItem>
                        <FormItem
                            label={localizedStrings.confPassword}
                            validateStatus={this.state.confirmedPassword.validateStatus}
                            help={this.state.confirmedPassword.errorMsg}>
                            <Input.Password
                                name="confirmedPassword"
                                type="password"
                                autoComplete="off"
                                placeholder={localizedStrings.helpForPass}
                                value={this.state.confirmedPassword.value}
                                onChange={(event) => this.handleInputChange(event, this.validateConfirmedPassword)}/>
                        </FormItem>

                        <FormItem wrapperCol={{...layout.wrapperCol, offset: 10}}>
                            <Button type="primary"
                                    htmlType="submit"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>
                                {localizedStrings.signUp}
                            </Button>
                            <br/>
                            {localizedStrings.alreadyRegister}
                            <Link
                                to="/login">{localizedStrings.signUpFromLoginNow}
                            </Link>
                        </FormItem>
                    </div>
                </Form>
            </div>
        );
    }


    handleUploadImage = image => {
        if (image.file.status === 'uploading') {
            this.setState({
                loading: true
            });
            return;
        }
        if (image.file.status === 'done') {
            getBase64(image.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    loading: false,
                }),
            );
        }
    };

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertBadCertificateNameTooShort
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: ERROR,
                errorMsg: localizedStrings.alertBadCertificateNameTooLong
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null,
            };
        }
    };

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertEmptyEmail
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertEmailNotValid
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: "Мыло слишком длинное!"
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    };


    validateEmailAvailability = () => {
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === ERROR) {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });


        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: SUCCESS,
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: ERROR,
                            errorMsg: localizedStrings.alertEmailAlreadyInUser
                        }
                    });
                }
            }).catch(() => {
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: SUCCESS,
                    errorMsg: null
                }
            });
        });

        this.setState({
            email: {
                value: emailValue,
                validateStatus: SUCCESS,
                errorMsg: null
            }
        });
    };

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: ERROR,
                errorMsg: localizedStrings.alertPasswordTooShort
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: ERROR,
                errorMsg: localizedStrings.alertPasswordTooLong
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null,
            };
        }
    };

    validateConfirmedPassword = (confirmedPassword) => {
        const validRes = this.validatePassword(confirmedPassword);
        if (validRes.validateStatus !== SUCCESS && confirmedPassword !== this.state.password) {
            return {
                validateStatus: ERROR,
                errorMsg: validRes.errorMsg + localizedStrings.alertConfPass
            }
        } else {
            return {
                validateStatus: SUCCESS,
                errorMsg: null,
            };
        }
    }

}


const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 16,
    },
};

export default Signup;
