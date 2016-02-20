import React from 'react';
import {CategoryStore} from './../../../stores';
import {CategoryActions, ProductActions} from './../../../actions';


class CategoryProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {},
            products: []
        };


    }

    componentWillReceiveProps(newProps) {
        this.setState({category: newProps.category, products: newProps.products});
    }

    render() {
        var { category, products } = this.state,
            self = this;
        return (
            <div className="panel-body">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(function (product) {
                        return (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>
                                    <a onClick={self._removeProduct.bind(self, product)}
                                        className="glyphicon glyphicon-remove"></a>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

    _removeProduct(product) {
        var { category } = this.state;
        ProductActions.updateProductCategory(false, product.id, category.id);
    }
}

export default CategoryProducts
//onClick={self._removePrice.bind(self, price.id)}