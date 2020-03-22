import React, {PureComponent} from 'react';

import {
    MAX_PRICE,
    PRODUCT_DESCRIPTION_MAX_LENGTH,
    PRODUCT_NAME_MAX_LENGTH,
    PRODUCT_NAME_MIN_LENGTH
} from '../../constants';
import './ProductLogic.css';
import {Form, Input, message, Select, Upload} from 'antd';
import {localizedStrings} from "../../util/Localization";
import Button from "antd/es/button";
import {getAllBrands} from "../../util/APIUtils";
import Product from "../ProductCart";

import {InboxOutlined} from '@ant-design/icons';
import FormItemLabel from "antd/es/form/FormItemLabel";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

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

class ProductForm extends PureComponent {


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
            imageUrl: props.product.imageUrl
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
            brand: brand
        };

        console.log('add works', productData)

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

    handleExpirationPeriodChange = (value) => {

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
            this.state.brands.forEach((brand) => {
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
                          'productCount': this.state.productCount.value
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
                                    message: 'Количество продукции обязательно обязательно!',
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
                            label={'Бренд'}
                            className="product-form-row">
                            <Select name="brand"
                                    defaultValue={'null'}
                                    onChange={this.handleExpirationPeriodChange}
                                    value={this.state.brand.name}
                                    style={{width: 350}}>
                                {brandsView}
                            </Select>
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

}


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


export default ProductForm;