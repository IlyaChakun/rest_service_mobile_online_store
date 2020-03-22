import React, {PureComponent} from 'react';
import ProductForm from "./ProductForm";
import './ProductLogic.css';
import {createProduct} from "../../util/APIUtils";

import {localizedStrings} from "../../util/Localization";
import {notification} from 'antd';

class AddProduct extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: {
                    text: '',
                    validateStatus: ''
                },
                description: {
                    text: '',
                    validateStatus: 'success'
                },
                price: {
                    value: '',
                    validateStatus: ''
                },
                brand: {
                    name: null
                },
                productCount: {
                    value: '',
                    validateStatus: ''
                },
                imageUrl: null
            }
        };
    }

    handleSubmitButton = (productData) => {
        createProduct(productData)
            .then(() => {

                notification.success({
                    message: localizedStrings.alertAppName,
                    description: localizedStrings.alertAddCertificateSuccessfully
                });
                this.props.history.push("/");

            })
            .catch(error => {
                if (error.status === 401) {
                    this.props.handleLogout('/login', 'error', localizedStrings.alertLoggedOut);
                } else {
                    notification.error({
                        message: localizedStrings.alertAppName,
                        description: localizedStrings.alertException
                    });
                }
            });
    };


    render() {

        return (
            <div>
                <h1 className="page-title">
                    Добавить новый продукт
                </h1>

                <div>
                    <ProductForm
                        product={this.state.product}
                        action={'Добавить'}
                        handleSubmitButton={this.handleSubmitButton}
                    />
                </div>

            </div>
        );
    }


}

export default AddProduct;