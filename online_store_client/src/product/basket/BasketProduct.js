import React, {Component} from 'react';
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {InputNumber, notification, Popconfirm} from "antd";
import ProductCart from "../ProductCart";
import {localizedStrings} from "../../util/Localization";


class BasketProduct extends Component {

    state = {
        quantity: this.props.productWithQuantity.quantity
    };

    confirm = (e) => {
        this.props.deleteProductFromBasket(this.props.productWithQuantity.product.id)
    };


    updateProductCount = (quantity) => {
        if (quantity >= 1 && quantity < 99) {
            if (Number(quantity) !== 0) {
                const productId = this.props.productWithQuantity.product.id;
                this.props.updateProductQuantity(quantity, productId);
            }
            this.setState({
                quantity: quantity
            });
        } else {
            this.setState({
                quantity: this.props.productWithQuantity.quantity
            });
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Количество должно быть не менее 0 и не более 99',
            });
        }
    };


    customFormatter = (value) => {
        return value < 1 || value > 99 ? this.state.quantity : value;
    };


    render() {

        const deleteAction = (
            <div>
                <Popconfirm
                    title="Вы уверены, что хотите удалить продукт из корзины?"
                    onConfirm={this.confirm}
                    okText="Yes"
                    cancelText="No">
                    <DeleteOutlined style={{fontSize: '25px'}}/>
                </Popconfirm>
            </div>);

        const countAction = (
            <div>

                <InputNumber defaultValue={this.state.quantity}
                             value={this.state.quantity}
                             type={'number'}
                             min={1}
                             max={this.props.productWithQuantity.product.countAvailable}
                             formatter={this.customFormatter}
                             onChange={this.updateProductCount}
                />

                <span className="quantity-cost-text">
                    Стоимость: {Number(this.props.productWithQuantity.quantity * this.props.productWithQuantity.product.price)}
                </span>
            </div>
        );


        return (

            <div>
                <ProductCart
                    history={this.props.history}
                    currentUser={this.props.currentUser}
                    isAuthenticated={this.props.isAuthenticated}
                    key={this.props.key}
                    product={this.props.productWithQuantity.product}
                    secondAction={deleteAction}
                    thirdAction={countAction}
                />
            </div>
        );
    }
}


export default BasketProduct;
