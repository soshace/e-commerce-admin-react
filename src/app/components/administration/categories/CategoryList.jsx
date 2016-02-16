import React from 'react';
import {Link} from 'react-router';
import {CategoryStore, ProjectStore} from './../../../stores';
import {CategoryActions, ProjectActions} from './../../../actions';


class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            project: this.props.project
        };

        this._onCategoriesGet = this._onCategoriesGet.bind(this);
        this._onAddClick = this._onAddClick.bind(this);
    }

    componentDidMount() {
        var { project } = this.state;

        CategoryStore.addChangeListener(this._onCategoriesGet);

        CategoryActions.getProjectCategories(true, project.id);
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._onCategoriesGet);
    }

    render() {
        var { categories, project } = this.state,
            projectKey = project.slug;
        return (
            <div>
                <div className="panel-heading">
                    All the categories for your project.
                </div>
                <div className="panel-body b-b b-light">
                    Search: <input id="filter" type="text" className="form-control input-sm w-auto inline m-r"/>
                    <button className="btn btn-icon btn-default" onClick={this._onAddClick}><i
                        className="fa fa-plus"></i></button>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>
                                Category name
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map(function (category) {
                            return (
                                <tr key={category.id}>
                                    <td>
                                        <Link to={`/${projectKey}/categories/${category.id}`}>{category.name}</Link>
                                    </td>
                                </tr>
                            )
                        })}

                        </tbody>
                        <tfoot className="">
                        <tr>
                            <td colSpan="5" className="text-center">
                                <ul className="pagination"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }

    _onAddClick() {
        var projectKey = this.state.project.slug;
        this.context.router.push(`/${projectKey}/categories/add`);
    }

    _onCategoriesGet() {
        var categories = CategoryStore.selectedCategories;
        this.setState({categories: categories});
    }
}

CategoryList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default CategoryList
