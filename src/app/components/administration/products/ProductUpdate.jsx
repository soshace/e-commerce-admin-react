import React from 'react';
import {ProductStore} from './../../../stores';
import {ProductActions} from './../../../actions';


class ProductUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            productTypes: [],
            productTypeId: null
        };

        this._onFieldUpdate = this._onFieldUpdate.bind(this);
        this._onProductTypeChange = this._onProductTypeChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            product: newProps.product,
            productTypes: newProps.productTypes,
            productTypeId: newProps.product.productType
        });
    }

    render() {
        var { product, productTypes, productTypeId } = this.state;

        return (
            <div className="panel-body">
                <form role="form" className="form-horizontal p-md col-md-12"
                      onSubmit={this._onSubmit}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Name</label>

                        <div className="col-sm-10">
                            <input
                                type="text"
                                value={product.name}
                                onChange={this._onFieldUpdate('name')}
                                className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Description</label>

                        <div className="col-sm-10">
                            <input
                                type="text"
                                value={product.description}
                                onChange={this._onFieldUpdate('description')}
                                className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Select</label>
                        <div className="col-sm-10">
                            <select className="form-control"
                                    value={productTypeId}
                                    onChange={this._onProductTypeChange}>
                                {productTypes.map(function (type) {
                                    return <option key={type.id} value={type.id} value={type.id}>{type.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info m-t">Save</button>
                </form>
            </div>
        )
    }

    _onProductTypeChange(e) {
        this.setState({productTypeId: e.target.value});
    }

    _onFieldUpdate(field) {
        var self = this;
        return e => {
            var product = this.state.product;
            product[field] = e.target.value;
            self.setState({product: product});
        };
    }

    _onSubmit(e) {
        var product = this.state.product;
        e.preventDefault();
        product.productType = this.state.productTypeId;
        ProductActions.updateProduct(product);
    }

}

export default ProductUpdate
