import React, {Component} from 'react';
import List from "antd/es/list";
import {getAllProducts} from "../../util/APIUtils";

import './ProductList.css';
import {withRouter} from "react-router-dom";
import ProductCartProxy from "../ProductCartProxy";
import ListFilterLogic from "./ListFilterLogic";

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {

            products: [],

            page: 0,
            size: 10,
            totalPages: 0,
            totalElements: 0,

            isLoading: false,
        }
    }


    componentDidMount() {
        //load list
        this.loadList(this.state.page, this.state.size);
    }


    loadSearchList = (productName, minPrice, maxPrice, sortBy, sortType, checkedBrands) => {
        this.loadList(this.state.page, this.state.size, productName, minPrice, maxPrice, sortBy, sortType, checkedBrands);
    };


    loadList = (page, size, productName, minPrice, maxPrice, sortBy, sortType, checkedBrands) => {

        const searchCriteria = {
            page: page,
            size: size,

            productName: productName,
            minPrice: minPrice,
            maxPrice: maxPrice,
            sortBy: sortBy,
            sortType: sortType,
            checkedBrands: checkedBrands
        };

        const promise = getAllProducts(searchCriteria);
        if (!promise) {
            return;
        }
        this.extractPromise(promise);
    };


    extractPromise = (promise) => {

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {

                this.setState({
                    products: response.objects.slice(),
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                });

            }).catch(() => {
            this.setState({
                isLoading: false
            });
        });
    };

    render() {


        const productsViews = [];

        this.state.products.forEach((product) => {
            productsViews.push(
                <ProductCartProxy
                    history={this.props.history}
                    currentUser={this.props.currentUser}
                    isAuthenticated={this.props.isAuthenticated}
                    key={product.id}
                    product={product}
                />
            )
        });


        return (
            <div className="products-container">

                <div>
                    <ListFilterLogic loadSearchList={this.loadSearchList}
                                     totalElements={this.state.totalElements}/>
                </div>


                <div className="certificates-content">

                    <List
                        grid={{
                            gutter: 70,
                            xs: 100,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 1,
                        }}

                        pagination={{

                            loading: this.state.isLoading,
                            showSizeChanger: true,

                            defaultCurrent: Number(this.state.page),
                            defaultPageSize: Number(this.state.size),

                            pageSizeOptions: ["6", "10"],
                            position: "bottom",

                            total: this.state.totalElements,

                            showQuickJumper: true,
                            onShowSizeChange: this.onSizeChangeHandler,
                            onChange: this.onPageChangeHandler,

                            loadMore: this.loadMore
                        }}

                        dataSource={productsViews}

                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        );
    }


    onSizeChangeHandler = (page, size) => {

        this.setState({
            page: page,
            size: size
        });
        this.loadList(page, size);
    };

    onPageChangeHandler = (pageNumber) => {

        console.log('onPageChangeHandler')
        console.log('pageNumber', pageNumber)
        console.log('totalElements', this.state.totalElements)
        console.log('totalPages', this.state.totalPages)

        this.setState({
            page: pageNumber
        });


        this.loadList(pageNumber, this.state.size);
    };

    loadMore = () => {

        console.log('LOAD MORE WORKS')

        this.loadList(this.state.page + 1, this.state.size);
    }
}

export default withRouter(ProductList);


