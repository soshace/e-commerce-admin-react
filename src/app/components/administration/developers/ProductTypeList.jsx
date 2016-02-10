import React from 'react';
import { Link } from 'react-router';
import { ProjectStore, ProductTypeStore } from './../../../stores';
import { ProjectActions, ProductTypeActions } from './../../../actions';

class ProductTypeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productTypes: []
        };

        this._onProductTypesGet = this._onProductTypesGet.bind(this);
        this._onProjectsGet = this._onProjectsGet.bind(this);
    }

    componentDidMount() {
        ProductTypeStore.addChangeListener(this._onProductTypesGet);
        ProjectStore.addChangeListener(this._onProjectsGet);
        ProjectActions.getProjects();
    }

    componentWillUnmount() {
        ProductTypeStore.removeChangeListener(this._onProductTypesGet);
        ProjectStore.removeChangeListener(this._onProjectsGet);
    }

    render() {
        var productTypes = this.state.productTypes,
            projectKey = this.props.params.projectKey;
        return (
            <div>
                <div className="panel-heading">
                    All the product types for your project.
                </div>
                <div className="panel-body b-b b-light">
                    <Link to={`/${projectKey}/developers/types/add`} className="btn btn-icon btn-default">
                        <i className="fa fa-plus"></i>
                    </Link>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {productTypes.map(function (type) {
                            return (
                                <tr key={type.id}>
                                    <td>
                                        <Link to={`/${projectKey}/types/${type.id}`}>{type.name}</Link>
                                    </td>
                                    <td>
                                        {type.description}
                                    </td>
                                </tr>
                            )
                        })}

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    _onProjectsGet() {
        var projectKey = this.props.params.projectKey,
            project = ProjectStore.getProjectByKey(projectKey);
        ProductTypeActions.getProjectProductTypes(project.id);
    }

    _onProductTypesGet() {
        this.setState({productTypes: ProductTypeStore.selectedProductTypes});
    }

}

export default ProductTypeList
