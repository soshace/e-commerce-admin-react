import React from 'react';
import {ProductStore} from './../../../stores';
import {ProductActions} from './../../../actions';


class ProductUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {}
        };

        this._onFieldUpdate = this._onFieldUpdate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({product: newProps.product});
    }

    render() {
        var product = this.state.product;
        return (
            <div className="panel-body">
                <form role="form" className="form-horizontal p-md col-md-12"
                      onSubmit={this._onSubmit}>
                    <div className="form-group">
                        <label className="col-sm-1 control-label">Name</label>

                        <div className="col-sm-11">
                            <input
                                type="text"
                                value={product.name}
                                onChange={this._onFieldUpdate('name')}
                                className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-1 control-label">Description</label>

                        <div className="col-sm-11">
                            <input
                                type="text"
                                value={product.description}
                                onChange={this._onFieldUpdate('description')}
                                className="form-control"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info m-t">Save</button>
                </form>
            </div>
        )
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
        e.preventDefault();
        var product = this.state.product;
        ProductActions.updateProduct(product);
    }

}

export default ProductUpdate
