import React, {PureComponent} from 'react';
import ProductForm from "./ProductForm";
import {Button, message, Popconfirm, notification} from "antd";
import {localizedStrings} from "../../util/Localization";
import {deleteProduct, getProductById, updateProduct} from "../../util/APIUtils";
import LoadingIndicator from "../../common/util/LoadingIndicator";
import DeleteModal from "./DeleteModal";


class EditProduct extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            product: null
        };
    }

    componentDidMount() {
        const product = getProductById(this.props.match.params.id);
        product
            .then(response => {

                const brandName = response.brand === null ? null : response.brand.name;

                this.setState({
                    product: {
                        id: response.id,
                        name: {
                            text: response.name,
                            validateStatus: 'success'
                        },
                        description: {
                            text: response.description,
                            validateStatus: 'success'
                        },
                        price: {
                            value: response.price,
                            validateStatus: 'success'
                        },
                        brand: {
                            name: brandName
                        },
                        productCount: {
                            value: response.countAvailable,
                            validateStatus: 'success'
                        },
                        imageUrl: response.imageUrl
                    }
                });
            })
    }

    handleSubmitButton = (productData) => {

        updateProduct(productData)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: localizedStrings.alertEditCertificateSuccessfully
                });
                this.props.history.push("/");
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogout('/login', 'error', localizedStrings.alertLoggedOut);
            } else {
                notification.error({
                    message: localizedStrings.alertAppName,
                    description: error.message || localizedStrings.alertException
                });
            }
        });
    };


    render() {

        const loadingIndicatorOrReadyForm = this.state.product === null ?
            (<LoadingIndicator/>)
            :
            (<ProductForm
                product={this.state.product}
                action={'Изменить'}
                handleSubmitButton={this.handleSubmitButton}/>);

        const loadingOrDeleteModal = this.state.product === null ?
            '' : (
                <DeleteModal productId={this.state.product.id}
                             button={<Button type="primary"
                                             htmlType="submit"
                                             size="large">
                                 {localizedStrings.delete}
                             </Button>}/>
            );

        return (
            <div>

                <h1 className="page-title">
                    Изменить продукт
                </h1>

                <div>
                    {loadingIndicatorOrReadyForm}
                </div>

                <div className="logic-buttons-position">
                    {loadingOrDeleteModal}
                </div>
            </div>
        );
    }
}


export default EditProduct;