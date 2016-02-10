import React from 'react';
import {CategoryStore, ProjectStore} from './../../../stores';
import {CategoryActions, ProjectActions, ProductActions} from './../../../actions';
import _ from 'underscore';


class ProductCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            product: {}
        };
        this._onCategoriesGet = this._onCategoriesGet.bind(this);
        this._onCategoryChange = this._onCategoryChange.bind(this);
    }

    componentDidMount() {
        CategoryStore.addChangeListener(this._onCategoriesGet);
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._onCategoriesGet);
    }

    componentWillReceiveProps(newProps) {
        CategoryActions.getProjectCategories(false, newProps.project.id);
        this.setState({project: newProps.project, product: newProps.product});
    }

    render() {
        var categories = this.state.categories,
            self = this,
            product = this.state.product;
        return (
            <div className="panel-body">
                <div className="form-group">
                    <div className="col-sm-10">
                        {categories.map(function (c) {
                            var checked = (!!_.findWhere(product.categories, {id: c.id})) ? {checked: 'checked'} : {};
                            return (
                                <div className="checkbox" key={c.id}>
                                    <label className="ui-checks">
                                        <input type="checkbox" onChange={self._onCategoryChange(c)} {...checked} />
                                        <i></i>
                                        {c.name}
                                    </label>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }

    _onCategoriesGet() {
        var categories = CategoryStore.selectedCategories;
        this.setState({categories: categories});
    }

    _onCategoryChange(c) {
        var self = this;
        return (e) => {
            var product = this.state.product,
                categories = this.state.categories,
                productCategories = product.categories,
                checked = e.target.checked,
                productId = this.props.product.id,
                productCategory = _.findWhere(productCategories, {id: c.id}),
                category = _.findWhere(categories, {id: c.id});

            if (productCategory) {
                productCategories = _.reject(productCategories, {id: c.id});
            } else {
                productCategories.push(category);
            }
            category.checked = checked;
            product.categories = productCategories;
            ProductActions.updateProductCategory(checked, productId, c.id, categories);
            self.setState({categories: categories, product: product});
        }
    }

}

export default ProductCategories
