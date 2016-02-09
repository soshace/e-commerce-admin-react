import React from 'react';
import {ProductStore, ProjectStore} from './../../../stores';
import {ProductActions, ProjectActions} from './../../../actions';


class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };

        this._onProductsGet = this._onProductsGet.bind(this);
        this._onProjectsGet = this._onProjectsGet.bind(this);
        this._onAddClick = this._onAddClick.bind(this);
    }

    componentDidMount() {
        ProductStore.addChangeListener(this._onProductsGet);
        ProjectStore.addChangeListener(this._onProjectsGet);
        ProjectActions.getProjects();
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductsGet);
        ProjectStore.removeChangeListener(this._onProjectsGet);
    }

    render() {
        var products = this.state.products;
        return (
            <div>
                <div className="panel-heading">
                    All the products for your project.
                </div>
                <div className="panel-body b-b b-light">
                    Search: <input id="filter" type="text" className="form-control input-sm w-auto inline m-r"/>
                    <button className="btn btn-icon btn-default" onClick={this._onAddClick}><i className="fa fa-plus"></i></button>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>
                                Product Name
                            </th>
                            <th>
                                Description
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(function (product) {
                            return (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
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
        this.context.router.push(`/${projectKey}/products/add`);
    }

    _onProjectsGet() {
        var projectKey = this.props.params.projectKey,
            project = ProjectStore.getProjectByKey(projectKey);

        ProductActions.getProjectProducts(true, project.id);
    }

    _onProductsGet() {
        var products = ProductStore.selectedProducts;
        this.setState({products: products});
    }
}

ProductList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ProductList
