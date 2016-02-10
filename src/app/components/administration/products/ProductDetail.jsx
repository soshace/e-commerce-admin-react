import React from 'react';
import {ProjectStore, ProductStore, CategoryStore, ProductTypeStore} from './../../../stores';
import {ProjectActions, ProductActions, CategoryActions, ProductTypeActions} from './../../../actions';

import ProductUpdate from './ProductUpdate.jsx';
import ProductOverview from './ProductOverview.jsx';
import ProductCategories from './ProductCategories.jsx';


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
    }

    componentDidMount() {
        ProductStore.addChangeListener(this._onProductGet);
        ProductTypeStore.addChangeListener(this._onProductTypesGet);
        ProjectStore.addChangeListener(this._onProjectsGet);

        ProjectActions.getProjects();
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductGet);
        ProductTypeStore.removeChangeListener(this._onProductTypesGet);
        ProjectStore.removeChangeListener(this._onProjectsGet);
    }

    render() {
        var { product, project, productTypes } = this.state;

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
            productTypes = ProductTypeStore.selectedProductTypes,
            project = ProjectStore.getProjectByKey(this.props.params.projectKey);
        this.setState({productTypes: productTypes, product: product, project: project});
    }
}

export default ProductDetail
