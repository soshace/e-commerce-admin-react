import React from 'react';
import {Link} from 'react-router';
import {CategoryStore, ProjectStore} from './../../../stores';
import {CategoryActions, ProjectActions} from './../../../actions';


class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

        this._onCategoriesGet = this._onCategoriesGet.bind(this);
        this._onAddClick = this._onAddClick.bind(this);
        this._onProjectsGet = this._onProjectsGet.bind(this);
    }

    componentDidMount() {
        CategoryStore.addChangeListener(this._onCategoriesGet);
        ProjectStore.addChangeListener(this._onProjectsGet);

        ProjectActions.getProjects();
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._onCategoriesGet);
        ProjectStore.removeChangeListener(this._onProjectsGet);
    }

    render() {
        var categories = this.state.categories,
            projectKey = this.props.params.projectKey;
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
        var projectKey = this.props.params.projectKey;
        this.context.router.push(`/${projectKey}/categories/add`);
    }

    _onProjectsGet() {
        var projectKey = this.props.params.projectKey,
            project = ProjectStore.getProjectByKey(projectKey);
        CategoryActions.getProjectCategories(true, project.id);
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
