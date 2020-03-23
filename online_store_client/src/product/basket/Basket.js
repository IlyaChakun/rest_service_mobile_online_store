import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";
import BasketProduct from "./BasketProduct";
import List from "antd/es/list";
import './Basket.css'
import {Form, notification, Popconfirm} from "antd";
import {localizedStrings} from "../../util/Localization";
import FormItem from "antd/es/form/FormItem";
import Button from "antd/es/button";
import Checkbox from "antd/es/checkbox";
import {createOrder, deleteProductFromBasket, getAllBasketProducts, updateProductInBasket} from "../../util/APIUtils";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

class Basket extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            totalElements: 0,
            totalPrice: 0,

            loading: false
        };
    }


    componentDidMount() {

        console.log('componentDidMount');

        this.setBasketState();
    }


    setBasketState = () => {

        this.setState({
            isLoading: true
        });
        const userId = this.props.match.params.id;
        const promise = getAllBasketProducts(userId);

        if (!promise) {
            return;
        }

        promise
            .then(response => {
                this.setState({
                    products: response.products,
                    totalElements: response.totalElements,
                    totalPrice: response.totalPrice,
                });

            }).catch(() => {
            this.setState({
                isLoading: false
            });
        });
    };


    handleShippingChange = (e) => {


        if (e.target.checked) {
            // this.props.addShipping();
            console.log('add shipping')
        } else {
            // this.props.substractShipping();
            console.log('remove shipping')
        }
    };


    confirm = () => {
        this.handleSubmitOrder();
    };

    handleSubmitOrder = () => {
        const userId = this.props.match.params.id;

        const order = {
            userId: userId
        };

        createOrder(order)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Заказ принят!',
                });
                this.props.history.push("/")
            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Не удалось создать заказ!' + error.message,
            });
        });
    };


    render() {

        const addedItems = [];

        this.state.products.forEach((productWithQuantity) => {

            addedItems.push(
                <BasketProduct
                    history={this.props.history}
                    currentUserId={this.props.match.params.id}
                    isAuthenticated={this.props.isAuthenticated}
                    key={productWithQuantity.product.id}
                    productWithQuantity={productWithQuantity}
                    deleteProductFromBasket={this.deleteProductFromBasket}
                    updateProductQuantity={this.updateProductQuantity}
                />
            )
        });

        return (
            <div className="basket-container">

                <div className="basket-container-header">
                    <h1>Корзина</h1>
                </div>

                <div className="basket-content">
                    <List
                        loading={this.state.loading}
                        grid={{
                            gutter: 70,
                            xs: 100,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 1,
                        }}
                        dataSource={addedItems}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />
                </div>

                <div className="basket-container-footer">
                    <Form {...layout}
                          onFinish={this.handleSubmitOrder}>

                        <FormItem className="certificate-form-row" wrapperCol={{...layout.wrapperCol, offset: 8}}>
                            <Checkbox
                                style={{
                                    lineHeight: '32px',
                                }}
                                onClick={this.handleShippingChange}>
                                Доставка
                            </Checkbox>
                        </FormItem>

                        <FormItem className="certificate-form-row" wrapperCol={{...layout.wrapperCol, offset: 8}}>
                             <span className="quantity-cost-text">
                                Общая сумма: {this.state.totalPrice} за {this.state.totalElements} товар(ов)
                            </span>
                        </FormItem>
                        <FormItem className="certificate-form-row" wrapperCol={{...layout.wrapperCol, offset: 8}}>

                            <div className="buttons-position">
                                <Popconfirm
                                    title="Вы уверены, что хотите сделать заказ?"
                                    onConfirm={this.confirm}
                                    okText="Yes"
                                    cancelText="No">
                                    <Button type="primary"
                                            htmlType="submit"
                                            size="large"
                                            className="basic-form-button">
                                        Оформить заказ
                                    </Button>
                                </Popconfirm>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }


    deleteProductFromBasket = (productId) => {
        const userId = this.props.match.params.id;

        const productBasket = {
            userId: userId,
            productId: productId
        };

        deleteProductFromBasket(productBasket)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Продукт удален из корзины!',
                });
                this.setBasketState();
            }).catch(error => {

            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Не удалось удалить продукт из корзину!',
            });
        });
    };


    updateProductQuantity = (quantity, productId) => {

        const userId = this.props.match.params.id;
        const productBasket = {
            userId: userId,
            productId: productId,
            quantity: quantity
        };

        updateProductInBasket(productBasket)
            .then(() => {
                this.setBasketState();
            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Не удалось изменить колво в корзине!',
            });
        });
    };
}


export default withRouter(Basket);