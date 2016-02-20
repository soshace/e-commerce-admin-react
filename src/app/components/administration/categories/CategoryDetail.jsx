import React from 'react';
import {ProductStore, CategoryStore} from './../../../stores';
import {ProductActions , CategoryActions} from './../../../actions';

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
        var { products, category } = this.state;
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
                        <a href data-toggle="tab" data-target="#tab_3">Products</a>
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
                        <CategoryProducts category={category} products={products} />
                    </div>
                </div>
            </div>
        )
    }

    _onProductsGet() {
        this.setState({products: ProductStore.categoryProducts});
    }

    _onCategoryGet() {
        var category = CategoryStore.selected;
        this.setState({category: category});

        ProductActions.getCategoryProducts(category.id);
    }
}

export default CategoryDetail
