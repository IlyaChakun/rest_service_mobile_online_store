import React, {Component} from 'react';
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {InputNumber, Popconfirm} from "antd";
import ProductCart from "../ProductCart";


class BasketProduct extends Component {


    confirm = (e) => {
        this.props.deleteProductFromBasket(this.props.productWithQuantity.product.id)
    };


    updateProductCount = (quantity) => {
        if (Number(quantity) !== 0) {
            const productId = this.props.productWithQuantity.product.id;
            this.props.updateProductQuantity(quantity, productId);
        }
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

                <InputNumber defaultValue={this.props.productWithQuantity.quantity}
                             min={1}
                             max={99}
                             onChange={(event) => this.updateProductCount(event)}
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