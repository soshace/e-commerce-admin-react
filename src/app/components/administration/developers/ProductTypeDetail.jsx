import React from 'react';
import {ProductTypeStore} from './../../../stores';
import {ProductTypeActions} from './../../../actions';


class ProductTypeDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productType: {}
        };

        this._onProductTypeGet = this._onProductTypeGet.bind(this);
        this._onFieldUpdate = this._onFieldUpdate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        var productTypeId = this.props.params.productTypeId;
        ProductTypeStore.addChangeListener(this._onProductTypeGet);
        ProductTypeActions.getProductType(productTypeId);
    }

    componentWillUnmount() {
        ProductTypeStore.removeChangeListener(this._onProductTypeGet);
    }

    render() {
        var productType = this.state.productType;
        return (
            <div className="panel-body">
                <form className="form-horizontal p-h-xsform-horizontal p-h-xs"
                      onSubmit={this._onSubmit}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Name</label>

                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                value={productType.name}
                                onChange={this._onFieldUpdate('name')}
                                placeholder="Name"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Description</label>

                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                value={productType.description}
                                onChange={this._onFieldUpdate('description')}
                                placeholder="Description"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group m-t">
                        <div className="col-sm-4 col-sm-offset-2">
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    _onFieldUpdate(field) {
        var self = this;
        return e => {
            var productType = this.state.productType;
            productType[field] = e.target.value;
            self.setState({productType: productType});
        };
    }

    _onSubmit(e) {
        var productType = this.state.productType;
        e.preventDefault();
        ProductTypeActions.updateProductType(productType);
    }

    _onProductTypeGet() {
        this.setState({productType: ProductTypeStore.selectedProductType});
    }
}

export default ProductTypeDetail
