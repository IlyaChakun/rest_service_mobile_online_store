import React, {Component} from 'react';
import './ProductList.css';
import {Checkbox, Col, Input, Row, Select, Slider} from "antd";
import {localizedStrings} from "../../util/Localization";
import {getAllBrands} from "../../util/APIUtils";

const {Search} = Input;
const Option = Select.Option;


class ListFilterLogic extends Component {


    state = {
        productName: {
            value: ''
        },
        sortBy: 'price',
        sortType: 'asc',
        minPrice: 0,
        maxPrice: 10000,
        checkedBrands: [],

        brands: null
    };


    componentDidMount() {
        const brands = getAllBrands();
        brands
            .then(response => {
                this.setState({
                    brands: response
                })
            });
    }

    updateList = () => {
        const productName = this.state.productName.value;
        const sortBy = this.state.sortBy;
        const sortType = this.state.sortType;
        const minPrice = this.state.minPrice;
        const maxPrice = this.state.maxPrice;
        const checkedBrands = this.state.checkedBrands;

        this.props.loadSearchList(productName, minPrice, maxPrice, sortBy, sortType, checkedBrands);
    };


    handleSubmitSearch = (value) => {
        this.setState({
            productName: {
                value: value
            }
        });
        this.updateList();
    };


    handleFindByProductNameChange = (event) => {
        const target = event.target;
        const inputValue = target.value;
        this.setState({
            productName: {
                value: inputValue
            }
        });
    };


    handleSortSelectChange = (value) => {
        this.state.sortBy = value;
        this.updateList();
    };

    handleSortTypeSelectChange = (value) => {
        this.state.sortType = value;
        this.updateList();
    };

    handlePriceSliderChange = (priceRange) => {
        const minPrice = priceRange[0];
        const maxPrice = priceRange[1];
        this.setState({
            minPrice: minPrice,
            maxPrice: maxPrice
        });
        this.updateList();
    };

    handleBrandsChecked = (checkedBrands) => {
        this.state.checkedBrands = checkedBrands;
        this.updateList();
    };


    render() {

        const brandsView = [];

        if (this.state.brands !== null) {
            this.state.brands.forEach(brand => {
                brandsView.push(
                    <Row>
                        <Col span={8}>
                            <Checkbox value={brand.name}>
                                {brand.name}
                            </Checkbox>
                        </Col>
                    </Row>
                )
            });
        }

        return (
            <div>

                <div className="certificates-container-header">
                    <div>
                        <div className="certificates-header-text">
                            Мобильные телефоны
                        </div>
                        <div className="search">
                            <div className="search-line-position">
                                <Search placeholder="Поиск..."
                                        value={this.state.productName.value}
                                        onChange={this.handleFindByProductNameChange}
                                        onSearch={this.handleSubmitSearch}
                                        enterButton/>
                            </div>
                        </div>
                    </div>
                </div>


                <aside className="aside-position">

                    <Row gutter={[5, 40]}>

                        <Col span={50}>
                            <div className="text-logic-style">
                                Выберите диапазон стоимость
                            </div>
                            <div>
                                <Slider range
                                        max={10000}
                                        min={1}
                                        defaultValue={[this.state.minPrice, this.state.maxPrice]}
                                        onChange={this.handlePriceSliderChange}/>
                            </div>
                        </Col>

                        <Col span={50}>
                            <div className="text-logic-style">
                                Производитель:
                            </div>

                            <Checkbox.Group style={{width: '100%'}}
                                            onChange={this.handleBrandsChecked}>
                                {brandsView}
                            </Checkbox.Group>
                        </Col>


                        <Col span={50}>
                            <div className="text-logic-style">
                                Сортировать
                            </div>

                            <Row>
                                <Col span={14}>
                                    <Select
                                        defaultValue={this.state.sortBy}
                                        className="sort-field-style"
                                        onSelect={this.handleSortSelectChange}>
                                        <Option value="price">
                                            {localizedStrings.sortByPrice}
                                        </Option>
                                        <Option value="dateOfCreation">
                                            {localizedStrings.sortByDateOfCreation}
                                        </Option>
                                    </Select>
                                </Col>
                                <Col span={4}>
                                    <Select
                                        defaultValue={this.state.sortType}
                                        className="sort-type-style"
                                        onSelect={this.handleSortTypeSelectChange}>
                                        <Option value="asc">
                                            По возрастанию
                                        </Option>
                                        <Option value="desc">
                                            По убыванию
                                        </Option>
                                    </Select>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={50}>
                            <div className="text-logic-style">
                                Найдено: {this.props.totalElements} товаров
                            </div>
                        </Col>

                    </Row>
                </aside>
            </div>
        );
    }
}


export default ListFilterLogic;