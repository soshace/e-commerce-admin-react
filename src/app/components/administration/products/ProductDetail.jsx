import React from 'react';
import {ProjectStore, ProductStore, CategoryStore, ProductTypeStore, VariantStore} from './../../../stores';
import {ProjectActions, ProductActions, CategoryActions, ProductTypeActions, VariantActions} from './../../../actions';

import ProductUpdate from './ProductUpdate.jsx';
import ProductOverview from './ProductOverview.jsx';
import ProductCategories from './ProductCategories.jsx';
import ProductVariants from './ProductVariants.jsx';
import ProductImages from './ProductImages.jsx';


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: null,
            project: null
        };

        this._onProductGet = this._onProductGet.bind(this);
        this._onProjectsGet = this._onProjectsGet.bind(this);
        this._onProductTypesGet = this._onProductTypesGet.bind(this);
        this._onVariantsTypesGet = this._onVariantsTypesGet.bind(this);
    }

    componentDidMount() {
        ProductStore.addChangeListener(this._onProductGet);
        ProductTypeStore.addChangeListener(this._onProductTypesGet);
        ProjectStore.addChangeListener(this._onProjectsGet);
        VariantStore.addChangeListener(this._onVariantsTypesGet);

        ProjectActions.getProjects();
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductGet);
        ProductTypeStore.removeChangeListener(this._onProductTypesGet);
        ProjectStore.removeChangeListener(this._onProjectsGet);
        VariantStore.removeChangeListener(this._onVariantsTypesGet);
    }

    render() {
        var { product, project, productTypes, productAttributes, variants } = this.state;

        return (
            <div>
                <ul className="nav nav-md nav-tabs nav-lines b-info">
                    <li className="active">
                        <a href data-toggle="tab" data-target="#tab_1">Overview</a>
                    </li>
                    <li>
                        <a href data-toggle="tab" data-target="#tab_2">Update Product</a>
                    </li>
                    <li>
                        <a href data-toggle="tab" data-target="#tab_3">Categories</a>
                    </li>
                    <li>
                        <a href data-toggle="tab" data-target="#tab_4">Variants</a>
                    </li>
                    <li>
                        <a href data-toggle="tab" data-target="#tab_5">Images</a>
                    </li>
                </ul>
                <div className="tab-content p m-b-md b-t b-t-2x">
                    <div role="tabpanel" className="tab-pane animated fadeIn active" id="tab_1">
                        <ProductOverview product={product} productTypes={productTypes} />
                    </div>
                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_2">
                        <ProductUpdate product={product} productTypes={productTypes} />
                    </div>
                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_3">
                        <ProductCategories product={product} project={project} />
                    </div>
                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_4">
                        <ProductVariants variants={variants} product={product} project={project} productAttributes={productAttributes} />
                    </div>
                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_5">
                        <ProductImages variants={variants} />
                    </div>
                </div>
            </div>
        )
    }

    _onProjectsGet() {
        var productId = this.props.params.productId;
        ProductActions.getProduct(productId);
    }

    _onProductGet() {
        var project = ProjectStore.getProjectByKey(this.props.params.projectKey);
        ProductTypeActions.getProjectProductTypes(project.id);
    }

    _onProductTypesGet() {
        var product = ProductStore.selectedProduct,
            productAttributes = ProductTypeStore.selectedProductType.attributes;

        if (productAttributes) {
            VariantActions.getProductVariants(product.id);
        } else {
            ProductTypeActions.getProductTypeAttributes(product.productType);
        }
    }

    _onVariantsTypesGet() {
        var product = ProductStore.selectedProduct,
            productTypes = ProductTypeStore.selectedProductTypes,
            project = ProjectStore.getProjectByKey(this.props.params.projectKey),
            productAttributes = ProductTypeStore.selectedProductType.attributes,
            variants = VariantStore.selectedVariants;

        this.setState({productTypes, product, project, productAttributes, variants});

    }
}

export default ProductDetail
