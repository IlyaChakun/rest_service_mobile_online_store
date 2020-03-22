import React, {Component} from 'react';
import Link from "react-router-dom/Link";
import {isAdmin} from "../app/App";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import DeleteModal from "./action/DeleteModal";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import ProductCart from "./ProductCart";
import Button from "antd/es/button";
import {addProductToBasket} from "../util/APIUtils";
import {notification} from "antd";
import {localizedStrings} from "../util/Localization";


class ProductCartProxy extends Component {


    addToBasket = () => {
        const productBasket = {
            userId: this.props.currentUser.id,
            productId: this.props.product.id
        };

        addProductToBasket(productBasket)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Продукт добавлен в корзину!',
                });
            }).catch(error => {

            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Не удалось добавить продукт в корзину!',
            });
        });
    };

    render() {

        const editAction = (
            <Link
                to={'/edit/' + this.props.product.id}>
                            <span className={isAdmin(this.props.currentUser) ? '' : 'custom-hidden'}>
                                 <SettingOutlined style={{fontSize: '25px'}}/>
                            </span>
            </Link>);
        const deleteAction = (

            <div className={isAdmin(this.props.currentUser) ? '' : 'custom-hidden'}>
                <DeleteModal
                    productId={this.props.product.id}
                    button={
                        <DeleteOutlined style={{fontSize: '25px'}}/>
                    }/>
            </div>);
        const buyAction = (
            <span className={this.props.isAuthenticated ? '' : 'custom-hidden'}
                  onClick={() => this.addToBasket()}>
                             <PlusCircleOutlined style={{fontSize: '27px', color: '#cc3242'}}/>
                        </span>

        );

        return (
            <ProductCart
                history={this.props.history}
                currentUser={this.props.currentUser}
                isAuthenticated={this.props.isAuthenticated}
                product={this.props.product}
                firstAction={editAction}
                secondAction={deleteAction}
                thirdAction={buyAction}
            />
        );
    }

}

export default ProductCartProxy;