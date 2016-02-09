import React from 'react';
import {ProductStore} from './../../../stores';
import {ProductActions} from './../../../actions';

import ProductUpdate from './ProductUpdate.jsx';
import ProductOverview from './ProductOverview.jsx';


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: null
        };

        this._onProductGet = this._onProductGet.bind(this);
    }

    componentDidMount() {
        ProductStore.addChangeListener(this._onProductGet);
        var productId = this.props.params.productId;
        ProductActions.getProduct(productId);
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductGet);
    }

    render() {
        var product = this.state.product;
        return (
            <div>
                <ul className="nav nav-md nav-tabs nav-lines b-info">
                    <li className="active">
                        <a href data-toggle="tab" data-target="#tab_1">Overview</a>
                    </li>
                    <li>
                        <a href data-toggle="tab" data-target="#tab_2">Update Product</a>
                    </li>
                </ul>
                <div className="tab-content p m-b-md b-t b-t-2x">
                    <div role="tabpanel" className="tab-pane animated fadeIn active" id="tab_1">
                        <ProductOverview product={product}/>
                    </div>
                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_2">
                        <ProductUpdate product={product} />
                    </div>
                </div>
            </div>
        )
    }

    _onProductGet() {
        var product = ProductStore.selectedProduct;
        this.setState({product: product});
    }
}

export default ProductDetail
