import React from 'react';
import ProductStore from './../../../stores/ProductStore.js';
import ProductActions from './../../../actions/ProductActions.js';
import CategoryStore from './../../../stores/CategoryStore.js';
import CategoryActions from './../../../actions/CategoryActions.js';

import CategoryProducts from './CategoryProducts.jsx';
import CategoryUpdate from './CategoryUpdate.jsx';
import CategoryOverview from './CategoryOverview.jsx';


class CategoryDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            category: null
        };

        this._onProductsGet = this._onProductsGet.bind(this);
        this._onCategoryGet = this._onCategoryGet.bind(this);
        this._onProductsTabClick = this._onProductsTabClick.bind(this);
    }

    componentDidMount() {
        ProductStore.addChangeListener(this._onProductsGet);
        CategoryStore.addChangeListener(this._onCategoryGet);
        var categoryId = this.props.params.categoryId;

        CategoryActions.getCategory(categoryId);
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductsGet);
        CategoryStore.removeChangeListener(this._onCategoryGet);
    }

    render() {
        var products = this.state.products,
            category = this.state.category;
        return (
            <div>
                <ul className="nav nav-md nav-tabs nav-lines b-info">
                    <li className="active">
                        <a href data-toggle="tab" data-target="#tab_1">Overview</a>
                    </li>
                    <li>
                        <a href data-toggle="tab" data-target="#tab_2">Update Category</a>
                    </li>
                    <li>
                        <a href data-toggle="tab" data-target="#tab_3" onClick={this._onProductsTabClick}>Products</a>
                    </li>
                </ul>
                <div className="tab-content p m-b-md b-t b-t-2x">
                    <div role="tabpanel" className="tab-pane animated fadeIn active" id="tab_1">
                        <CategoryOverview category={category}/>
                    </div>
                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_2">
                        <CategoryUpdate category={category} />
                    </div>
                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_3">

                    </div>
                </div>
            </div>
        )
    }

    //<CategoryProducts products={products} />

    _onProductsGet() {
        this.setState({products: ProductStore.products});
    }

    _onProductsTabClick() {
        ProductActions.getProducts(true);
    }

    _onCategoryGet() {
        this.setState({category: CategoryStore.selected});
    }
}

export default CategoryDetail
