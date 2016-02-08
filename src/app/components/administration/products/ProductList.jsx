import React from 'react';
import ProductStore from './../../../stores/ProductStore.js';
import ProductActions from './../../../actions/ProductActions.js';


class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };

        this._onProductsGet = this._onProductsGet.bind(this);
        this._onAddClick = this._onAddClick.bind(this);
    }

    componentDidMount() {
        ProductStore.addChangeListener(this._onProductsGet);
        ProductActions.getProducts();
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductsGet);
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

    _onProductsGet() {
        var products = ProductStore.products;
        this.setState({products: products});

    }
}

ProductList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ProductList
