import React, {Component} from 'react';
import './Profile.css';
import {Checkbox, DatePicker, Form, Input, Select, Upload} from 'antd';
import {localizedStrings} from "../../util/Localization";

const FormItem = Form.Item;
const Option = Select.Option;

class UpdateProfile extends Component {


    render() {


        return (
            <div className="profile-container">

                <Form {...layout}
                      onFinish={this.handleSubmit}
                      initialValues={{}}>

                    <FormItem
                        label={"Имя"}
                        validateStatus={this.state.name.validateStatus}
                        help={this.state.name.errorMsg}
                        name={"name"}
                        rules={[
                            {
                                message: 'Название обязательно',
                                required: true,
                            },
                        ]}
                        onChange={this.handleNameChange}>
                        <Input placeholder={localizedStrings.helpForCertificateName}
                               style={{fontSize: '16px'}}
                               autosize={{minRows: 3, maxRows: 6}}/>
                    </FormItem>

                </Form>
            </div>
        );
    }
}

export default UpdateProfile;
