import React from 'react';
import ProductStore from './../../../stores/ProductStore.js';
import ProductActions from './../../../actions/ProductActions.js';


class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };

        this._onProductsGet = this._onProductsGet.bind(this);
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
            <div className="panel panel-default">
                <div className="panel-heading">
                    All the products for your project.
                </div>
                <div className="panel-body b-b b-light">
                    Search: <input id="filter" type="text" className="form-control input-sm w-auto inline m-r"/>
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
                        <tfoot className="hide-if-no-paging">
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

    _onProductsGet() {
        var products = ProductStore.products;
        this.setState({products: products});

    }
}

export default Products
