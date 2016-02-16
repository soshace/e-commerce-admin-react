import React from 'react';
import { Link } from 'react-router';
import { ProjectStore, ProductTypeStore } from './../../../stores';
import { ProjectActions, ProductTypeActions } from './../../../actions';

class ProductTypeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productTypes: [],
            project: this.props.project
        };

        this._onProductTypesGet = this._onProductTypesGet.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({project: newProps.project});
    }

    componentDidMount() {
        var { project } = this.state;
        ProductTypeStore.addChangeListener(this._onProductTypesGet);
        ProjectActions.getProjects();

        ProductTypeActions.getProjectProductTypes(project.id);
    }

    componentWillUnmount() {
        ProductTypeStore.removeChangeListener(this._onProductTypesGet);
    }

    render() {
        var { productTypes, project } = this.state,
            projectKey = project.slug;
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
                                        <Link to={`/${projectKey}/developers/types/${type.id}`}>{type.name}</Link>
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

    _onProductTypesGet() {
        this.setState({productTypes: ProductTypeStore.selectedProductTypes});
    }

}

export default ProductTypeList
