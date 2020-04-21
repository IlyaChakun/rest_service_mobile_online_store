import React, {Component} from 'react';
import './ProductForm.css';
import {Checkbox, DatePicker, Form, Input, Select, Upload} from 'antd';
import {localizedStrings} from "../../util/Localization";
import Button from "antd/es/button";
import {getAllBrands} from "../../util/APIUtils";

import {InboxOutlined} from '@ant-design/icons';
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import {beforeUpload, getBase64} from "../../util/PictureLoaderUtil";
import {flashMemories, operationSystems, screenResolutions, screenSize} from "./ProductConstants";
import {
    MAX_PRICE,
    PRODUCT_DESCRIPTION_MAX_LENGTH,
    PRODUCT_NAME_MAX_LENGTH,
    PRODUCT_NAME_MIN_LENGTH
} from "../../constants";
import moment from 'moment';

const {Dragger} = Upload;


const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const yearFormat = 'YYYY';

class ProductForm extends Component {


    constructor(props) {
        super(props);

        this.state = {

            brands: null,
            loading: false,

            id: props.product.id,

            name: {
                text: props.product.name.text,
                validateStatus: props.product.name.validateStatus
            },
            description: {
                text: props.product.description.text,
                validateStatus: props.product.description.validateStatus
            },
            price: {
                value: props.product.price.value,
                validateStatus: props.product.price.validateStatus
            },
            brand: {
                name: props.product.brand.name
            },
            productCount: {
                value: props.product.productCount.value,
                validateStatus: props.product.productCount.validateStatus
            },
            imageUrl: props.product.imageUrl,


            releaseYear: props.product.releaseYear,

            operationSystem: props.product.operationSystem,

            screenSize: props.product.screenSize,

            screenResolution: props.product.screenResolution,

            flashMemory: props.product.flashMemory,

            memoryCartSupport: props.product.memoryCartSupport,

            dustAndMoistureProtection: props.product.dustAndMoistureProtection
        };

    }


    componentDidMount() {
        const brands = getAllBrands();

        brands
            .then(response => {

                this.setState({
                    brands: response
                })
            });
    }

    handleSubmit = () => {

        const brand = this.state.brand.name === null ? null : this.state.brand;

        const productData = {
            id: this.state.id,
            name: this.state.name.text,
            description: this.state.description.text,
            price: this.state.price.value,
            countAvailable: this.state.productCount.value,
            imageUrl: this.state.imageUrl,
            brand: brand,

            releaseYear: this.state.releaseYear,
            operationSystem: this.state.operationSystem,
            screenSize: this.state.screenSize,
            screenResolution: this.state.screenResolution,
            flashMemory: this.state.flashMemory,
            memoryCartSupport: this.state.memoryCartSupport,
            dustAndMoistureProtection: this.state.dustAndMoistureProtection
        };

        this.props.handleSubmitButton(productData);
    };


    handleNameChange = (event) => {
        const value = event.target.value;

        this.setState({
            name: {
                text: value,
                ...this.validateName(value)
            }
        });
    };

    handlePriceChange = (event) => {
        const value = event.target.value;

        this.setState({
            price: {
                value: value,
                ...this.validatePrice(value)
            }
        })
    };

    handleProductCountChange = (event) => {
        const value = event.target.value;

        this.setState({
            productCount: {
                value: value,
                ...this.validateProductCount(value)
            }
        })
    };

    handleDescriptionChange = (event) => {
        const value = event.target.value;

        this.setState({
            description: {
                text: value,
                ...this.validateDescription(value)
            }
        });
    };

    handleBrandChange = (value) => {
        console.log(value)

        this.setState({
            brand: {
                name: value
            },
        });
    };


    isFormInvalid = () => {
        if (this.state.name.validateStatus !== 'success') {
            return true;
        }
        if (this.state.description.validateStatus !== 'success') {
            return true;
        }
        if (this.state.price.validateStatus !== 'success') {
            return true;
        }
        if (this.state.productCount.validateStatus !== 'success') {
            return true;
        }
        if (this.state.operationSystem === null) {
            return true;
        }
        if (this.state.flashMemory === null) {
            return true;
        }
        if (this.state.screenSize === null) {
            return true;
        }
        if (this.state.screenResolution === null) {
            return true;
        }
        if (this.state.brand.name === null) {
            return true;
        }
        if (this.state.releaseYear === null) {
            return true;
        }
    };


    render() {

        const uploadButton = (
            <div>
                {
                    this.state.loading ?
                        <LoadingOutlined/> :
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                }
            </div>
        );

        const brandsView = [
            <Option value={null}>
                не выбран
            </Option>
        ];

        if (this.state.brands !== null) {
            this.state.brands.forEach(brand => {
                brandsView.push(
                    <Option key={brand.id} value={brand.name}>
                        {brand.name}
                    </Option>
                )
            });
        }


        return (
            <div className="add-product-container">

                <Form {...layout}
                      onFinish={this.handleSubmit}
                      initialValues={{
                          'name': this.state.name.text,
                          'description': this.state.description.text,
                          'price': this.state.price.value,
                          'productCount': this.state.productCount.value,

                          'operationSystem': this.state.operationSystem,
                          'brand': this.state.brand.name,
                          'screenResolution': this.state.screenResolution,

                          'screenSize': this.state.screenSize,
                          'flashMemory': this.state.flashMemory,

                          'releaseYear': moment(this.state.releaseYear, yearFormat)
                      }}>

                    <aside className="aside-picture">
                        <Dragger
                            name="file"
                            listType="picture"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleUploadImageChange}>

                            {this.state.imageUrl ?
                                <img src={this.state.imageUrl} alt="avatar" style={{width: '100%'}}/> :
                                uploadButton
                            }

                            <p className="ant-upload-text">
                                Нажмите для выбора картинки
                            </p>
                        </Dragger>
                    </aside>


                    <div className="product-content-container">

                        <FormItem
                            label={localizedStrings.certificateName}
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}
                            className="product-form-row"
                            name={"name"}
                            rules={[
                                {
                                    message: 'Название обязательно',
                                    required: true,
                                },
                            ]}
                            onChange={this.handleNameChange}>
                            <Input placeholder={localizedStrings.helpForCertificateName}
                                   style={{fontSize: '16px'}}
                                   autosize={{minRows: 3, maxRows: 6}}/>
                        </FormItem>

                        <FormItem
                            label={localizedStrings.description}
                            validateStatus={this.state.description.validateStatus}
                            help={this.state.description.errorMsg}
                            className="product-form-row"
                            name={"description"}
                            onChange={this.handleDescriptionChange}>

                            <Input.TextArea placeholder={localizedStrings.helpForCertificateDescription}
                                            style={{fontSize: '16px'}}
                                            autosize={{minRows: 3, maxRows: 6}}/>
                        </FormItem>

                        <FormItem
                            label={localizedStrings.price}
                            validateStatus={this.state.price.validateStatus}
                            help={this.state.price.errorMsg}
                            className="product-form-row"
                            name={"price"}
                            rules={[
                                {
                                    message: 'Стоимость обязательно!',
                                    required: true,
                                },
                            ]}
                            onChange={this.handlePriceChange}>

                            <Input
                                placeholder={localizedStrings.helpForCertificatePrice}
                                style={{fontSize: '16px', width: '350px'}}
                                autosize={{minRows: 3, maxRows: 6}}/>
                        </FormItem>

                        <FormItem
                            label={'Количество продуктов'}
                            validateStatus={this.state.productCount.validateStatus}
                            help={this.state.productCount.errorMsg}
                            className="product-form-row"
                            name={"productCount"}
                            rules={[
                                {
                                    message: 'Количество продукции обязательно !',
                                    required: true,
                                },
                            ]}
                            onChange={this.handleProductCountChange}>

                            <Input
                                placeholder={localizedStrings.helpForCertificatePrice}
                                style={{fontSize: '16px', width: '350px'}}
                                autosize={{minRows: 3, maxRows: 6}}/>
                        </FormItem>

                        <FormItem
                            label={'Дата выхода на рынок'}
                            rules={[
                                {
                                    message: 'Дата выхода на рынок обязательна к выбору !',
                                    required: true,
                                },
                            ]}
                            name={'releaseYear'}>
                            <DatePicker
                                format={yearFormat}
                                picker="year"
                                onChange={this.handleReleaseYearChange}
                            />

                        </FormItem>

                        <FormItem
                            rules={[
                                {
                                    message: 'Выбор бренда обязателен!',
                                    required: true,
                                },
                            ]}
                            name={"brand"}
                            label={'Бренд'}
                            className="product-form-row">
                            <Select
                                defaultValue={'null'}
                                value={this.state.brand.name}
                                style={{width: 350}}
                                onChange={this.handleBrandChange}>
                                {brandsView}
                            </Select>
                        </FormItem>

                        <FormItem
                            rules={[
                                {
                                    message: 'Выбор ос обязателен!',
                                    required: true,
                                },
                            ]}
                            name={"operationSystem"}
                            label={'Операционная система'}
                            className="product-form-row">
                            <Select
                                defaultValue={'null'}
                                value={this.state.operationSystem}
                                style={{width: 350}}
                                onChange={this.handleOperatingSystem}>
                                {operationSystems}
                            </Select>
                        </FormItem>

                        <FormItem
                            rules={[
                                {
                                    message: 'Выбор размера экрана обязателен!',
                                    required: true,
                                },
                            ]}
                            name={"screenSize"}
                            label={'Размер экрана'}
                            className="product-form-row">
                            <Select
                                defaultValue={'null'}
                                value={this.state.screenSize}
                                style={{width: 350}}
                                onChange={this.handleScreenSize}>
                                {screenSize}
                            </Select>
                        </FormItem>

                        <FormItem
                            rules={[
                                {
                                    message: 'Выбор разрешения экрана обязателен!',
                                    required: true,
                                },
                            ]}
                            name={"screenResolution"}
                            label={'Разрешение экрана'}
                            className="product-form-row">
                            <Select
                                defaultValue={'null'}
                                value={this.state.screenResolution}
                                style={{width: 350}}
                                onChange={this.handleScreenResolution}>
                                {screenResolutions}
                            </Select>
                        </FormItem>

                        <FormItem
                            rules={[
                                {
                                    message: 'Выбор флеш памяти обязателен!',
                                    required: true,
                                },
                            ]}
                            name={"flashMemory"}
                            label={'Флэш-память'}
                            className="product-form-row">
                            <Select
                                defaultValue={'null'}
                                value={this.state.flashMemory}
                                style={{width: 350}}
                                onChange={this.handleFlashMemory}>
                                {flashMemories}
                            </Select>
                        </FormItem>

                        <FormItem
                            label={'Поддержка карт памяти'}
                            className="product-form-row">
                            <Checkbox
                                checked={this.state.memoryCartSupport}
                                onChange={this.handleMemoryCartSupport}>
                                Да
                            </Checkbox>
                        </FormItem>


                        <FormItem
                            label={'Пыле- и влагозащита'}
                            className="product-form-row">
                            <Checkbox
                                checked={this.state.dustAndMoistureProtection}
                                onChange={this.handleDustAndMoistureProtection}>
                                Да
                            </Checkbox>
                        </FormItem>


                        <FormItem className="certificate-form-row" wrapperCol={{...layout.wrapperCol, offset: 8}}>
                            <div className="buttons-position">
                                <Button type="primary"
                                        htmlType="submit"
                                        size="large"
                                        disabled={this.isFormInvalid()}
                                        className="basic-form-button">
                                    {this.props.action}
                                </Button>
                            </div>
                        </FormItem>

                    </div>
                </Form>
            </div>
        );
    }

    handleUploadImageChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({
                loading: true
            });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    loading: false,
                }),
            );
        }
    };


    validateName = (nameText) => {
        if (nameText.length < PRODUCT_NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: localizedStrings.alertBadCertificateNameTooShort
            }
        } else if (nameText.length > PRODUCT_NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: localizedStrings.alertBadCertificateNameTooLong
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    };

    validatePrice = (priceValue) => {
        if (priceValue < 0 || priceValue === undefined) {
            return {
                validateStatus: 'error',
                errorMsg: localizedStrings.alertBadCertificatePriceTooSmall
            }
        } else if (priceValue > MAX_PRICE) {
            return {
                validateStatus: 'error',
                errorMsg: localizedStrings.alertBadCertificatePriceTooBig
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    };


    validateProductCount = (productCount) => {
        if (productCount < 0 || productCount === undefined) {
            return {
                validateStatus: 'error',
                errorMsg: 'Количество продукции должно быть больше 0'
            }
        } else if (productCount > 5000) {
            return {
                validateStatus: 'error',
                errorMsg: 'Количество продукции не более 5000'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    };

    validateDescription = (descriptionText) => {
        if (descriptionText.length > PRODUCT_DESCRIPTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: localizedStrings.alertBadCertificateDescription
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    };


    handleReleaseYearChange = (date, dateString) => {
        this.setState({
            releaseYear: Number(dateString)
        });
    };

    handleOperatingSystem = (value) => {
        this.setState({
            operationSystem: value
        });
    };


    handleScreenSize = (value) => {
        this.setState({
            screenSize: value
        });
    };


    handleScreenResolution = (value) => {
        this.setState({
            screenResolution: value
        });
    };

    handleFlashMemory = (value) => {
        this.setState({
            flashMemory: value
        });
    };

    handleMemoryCartSupport = (e) => {
        this.setState({
            memoryCartSupport: e.target.checked
        });
    };

    handleDustAndMoistureProtection = (e) => {
        this.setState({
            dustAndMoistureProtection: e.target.checked
        });
    };

}


export default ProductForm;