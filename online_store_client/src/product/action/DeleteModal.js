import React, {Component} from 'react';
import {deleteProduct} from "../../util/APIUtils";
import {message, notification, Popconfirm} from "antd";
import {localizedStrings} from "../../util/Localization";
import {withRouter} from "react-router-dom";


class DeleteModal extends Component {

    state = {
        productId: this.props.productId,
        button: this.props.button
    };


    submitDelete = (productId) => {
        deleteProduct(productId)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: localizedStrings.alertDeleteCertificateSuccessfully
                });
                window.location.href = "/";
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogout('/login', 'error', localizedStrings.alertLoggedOut);
            } else if (error.status === 404) {
                notification.error({
                    message: localizedStrings.alertAppName,
                    description: 'Продукт не найден!'
                });
            } else {
                notification.error({
                    message: localizedStrings.alertAppName,
                    description: error.message || localizedStrings.alertException
                });
            }
        });
    };


    confirm = (e) => {
        console.log(e);
        this.submitDelete(this.state.productId)
    };

    cancel = (e) => {
        console.log(e);
       // message.error('Click on No');
    };


    render() {

        return (
            <div>
                <Popconfirm
                    title="Вы уверены, что хотите удалить продукт?"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No">
                    {this.state.button}
                </Popconfirm>
            </div>
        );
    }

}

export default withRouter(DeleteModal);
