import React, {PureComponent} from 'react';

import './Product.css';

import {Form, Rate, Select, Tag} from 'antd';
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import {withRouter,} from "react-router-dom";

import noImage from '../img/no_img.png';
import {addProductToBasket} from "../util/APIUtils";
import {localizedStrings} from "../util/Localization";

class ProductCart extends PureComponent {

    constructor(props) {
        super(props);
    }

    ;

    render() {

        const productAvatar = this.props.product.imageUrl === null ? (
                <img alt="picture"
                     src={noImage}
                     width={'200px'}
                     height={'200px'}/>
            ) :
            (
                <img alt="picture"
                     src={this.props.product.imageUrl}
                     width={'200px'}
                     height={'200px'}/>);

        const brandView = this.props.product.brand !== null ? (<Tag className="tag-look">
            <div>
                {this.props.product.brand.name}
            </div>
        </Tag>) : '';

        return (

            <div>

                <Card
                    hoverable
                    style={{width: 900, marginTop: 16}}
                    extra={
                        <span className="certificate-creation-date">
                            {this.props.product.price} р.
                        </span>
                    }
                    title={
                        <span>
                               {this.props.product.brand.name} {this.props.product.name}
                        </span>
                    }
                    actions={[
                        this.props.firstAction,
                        this.props.secondAction,
                        this.props.thirdAction
                    ]}>

                    <Meta
                        avatar={
                            <span>
                                {productAvatar}
                            </span>
                        }

                        title={
                            <div className="tag-content">
                                {brandView}
                            </div>
                        }

                        description={
                            <div>
                                <div className="product-content-body">
                                    {this.props.product.description}
                                    any description
                                </div>


                                <div className="product-rating-footer">
                                    <Form.Item name="rate" label="">
                                        <Rate/>
                                    </Form.Item>
                                </div>
                            </div>
                        }
                    />

                </Card>

            </div>
        );
    }
}

export default withRouter(ProductCart);
