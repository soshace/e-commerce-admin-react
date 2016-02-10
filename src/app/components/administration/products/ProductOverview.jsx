import React from 'react';
import { ProductTypeStore } from './../../../stores';

class ProductOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: '',
                description: ''
            },
            productType: {
                name: ''
            }
        }
    }

    componentWillReceiveProps(newProps) {
        var productType;
        if (newProps.product) {
            productType = ProductTypeStore.getTypeById(newProps.product.productType);
        }
        this.setState({product: newProps.product, productType: productType});
    }

    render() {
        var product = this.state.product,
            productType = this.state.productType;
        return (
            <div>
                <div className="row">
                    <label className="col-sm-2 control-label">Name:</label>
                    <div className="col-sm-10">{product.name}</div>
                </div>
                <div className="row">
                    <label className="col-sm-2 control-label">Description:</label>
                    <div className="col-sm-10">{product.description}</div>
                </div>
                <div className="row">
                    <label className="col-sm-2 control-label">Product type:</label>
                    <div className="col-sm-10">{productType.name}</div>
                </div>
            </div>
        )
    }

}

export default ProductOverview
