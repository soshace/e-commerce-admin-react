import React from 'react';
import { Link } from 'react-router';
import { ProjectStore, ProductTypeStore } from './../../../stores';
import { ProjectActions, ProductTypeActions } from './../../../actions';

class ProductTypes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productTypes: []
        };

        this._onProductTypesGet = this._onProductTypesGet.bind(this);
        this._onProjectsGet = this._onProjectsGet.bind(this);
        this._onAddClick = this._onAddClick.bind(this);
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
            projectKey = this.props.projectKey;
        return (
            <div>
                <div className="panel-heading">
                    All the product types for your project.
                </div>
                <div className="panel-body b-b b-light">
                    <button className="btn btn-icon btn-default" onClick={this._onAddClick}><i
                        className="fa fa-plus"></i></button>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>
                                Type name
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
        var projectKey = this.props.projectKey,
            project = ProjectStore.getProjectByKey(projectKey);
        ProductTypeActions.getProjectProductTypes(project.id);
    }

    _onProductTypesGet() {
        this.setState({productTypes: ProductTypeStore.selectedProductTypes});
    }

    _onAddClick() {

    }

}

export default ProductTypes
