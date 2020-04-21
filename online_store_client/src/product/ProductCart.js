import React, {PureComponent} from 'react';

import './Product.css';

import {Rate, Tag} from 'antd';
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import {withRouter,} from "react-router-dom";

import noImage from '../img/no_img.png';

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

        const notAvailable = this.props.product.countAvailable === 0 ? (
            <div style={{color: "red"}}>
                Товар отсутствует на складе!
            </div>
        ) : '';

        const productDescription = (
            <span>
                Год выпуска: {this.props.product.releaseYear};
                Операционная система: {this.props.product.operationSystem};
                Размер экрана: {this.props.product.screenSize};
                Разрешение экрана: {this.props.product.screenResolution};
                Память: {this.props.product.flashMemory};
                Поддержка флешки: {this.props.product.memoryCartSupport === true ? 'Да' : 'Нет'};
                Защита от пыли и влаги: {this.props.product.dustAndMoistureProtection === true ? 'Да' : 'Нет'};
            </span>
        );

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
                            <p>
                                   {notAvailable}
                               </p>
                        </span>
                    }
                    actions={[
                        this.props.firstAction,
                        this.props.secondAction,

                        this.props.product.countAvailable > 0 ? this.props.thirdAction : ''
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
                                    <p>
                                        {productDescription}
                                    </p>
                                </div>


                                <div className="product-rating-footer">
                                    <Rate/>
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
