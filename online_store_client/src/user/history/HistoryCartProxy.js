import React, {Component} from 'react';
import ProductCart from "../../product/ProductCart";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";


class HistoryCartProxy extends Component {


    render() {

        const productViews = [];

        this.props.orderProducts.forEach((product) => {
            productViews.push(
                <ProductCart
                    history={this.props.history}
                    currentUser={this.props.currentUser}
                    isAuthenticated={this.props.isAuthenticated}
                    product={product.product}
                    firstAction={''}
                    secondAction={''}
                    thirdAction={
                        <span className="text-info">
                            Количество купленой продукции: {product.quantity}
                        </span>}
                />
            )
        });

        return (

            <div>
                <Card
                    style={{width: 1100, marginTop: 35}}
                    extra={
                        <span className="certificate-creation-date">
                            Заказ был сделан: {this.props.order.dateOfPurchase}
                        </span>
                    }
                    title={
                        <div>
                            <p>
                                Данные: {this.props.order.user.name}
                            </p>
                            <p>
                                Сумма заказа: {this.props.order.price}
                            </p>
                            <p>
                                Способ
                                получения: {this.props.order.deliveryType === 'PICKUP' ? 'самовывоз' : 'доставка'}
                            </p>
                        </div>
                    }>

                    <Meta

                        description={
                            <div>
                                <div>
                                    {productViews}
                                </div>

                            </div>
                        }

                    />

                </Card>

            </div>
        );
    }

}

export default HistoryCartProxy;
