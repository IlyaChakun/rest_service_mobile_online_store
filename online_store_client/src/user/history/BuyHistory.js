import React, {Component} from 'react';
import List from "antd/es/list";
import {getAllUsersOrders} from "../../util/APIUtils";
import HistoryCartProxy from "./HistoryCartProxy";


class BuyHistory extends Component {


    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.currentUser.id,

            products: [],

            page: 0,
            size: 10,
            totalPages: 0,
            totalElements: 0,

            isLoading: false,
        };
    }


    componentDidMount() {
        this.loadList(this.state.page, this.state.size);
    }


    loadList = (page, size) => {

        const searchCriteria = {
            userId: this.state.userId,
            page: page,
            size: size
        };

        const promise = getAllUsersOrders(searchCriteria);

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

        const orderViews = [];

        this.state.products.forEach((order) => {
            orderViews.push(
                <HistoryCartProxy
                    history={this.props.history}
                    currentUser={this.props.currentUser}
                    isAuthenticated={this.props.isAuthenticated}
                    key={order.id}
                    order={order}
                    orderProducts={order.orderProducts}
                />
            )
        });

        return (
            <div className="products-container">

                <div>

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

                        dataSource={orderViews}

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
}


export default (BuyHistory);
