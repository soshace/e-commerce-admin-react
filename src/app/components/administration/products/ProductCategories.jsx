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
        this._onProjectsGet = this._onProjectsGet.bind(this);
        this._onCategoryChange = this._onCategoryChange.bind(this);
    }

    componentDidMount() {
        CategoryStore.addChangeListener(this._onCategoriesGet);
        ProjectStore.addChangeListener(this._onProjectsGet);
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._onCategoriesGet);
        ProjectStore.removeChangeListener(this._onProjectsGet);
    }

    componentWillReceiveProps(newProps) {
        this.setState({projectKey: newProps.projectKey, product: newProps.product});
        ProjectActions.getProjects();
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
                                        <input type="checkbox" onChange={self._onCategoryChange(c.id)} {...checked} />
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

    _onProjectsGet() {
        var projectKey = this.state.projectKey,
            project;
        if (projectKey) {
            project = ProjectStore.getProjectByKey(projectKey);
            CategoryActions.getProjectCategories(false, project.id);
        }
    }

    _onCategoriesGet() {
        this.setState({categories: CategoryStore.selectedCategories});
    }

    _onCategoryChange(categoryId) {
        return (e) => {
            var productId = this.props.product.id,
                categories = this.state.product.categories;
            //categories = _.reject(categories, )
            ProductActions.updateProductCategory(e.target.checked, productId, categoryId);
        }
    }

}

export default ProductCategories
