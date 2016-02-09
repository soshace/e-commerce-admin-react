import React from 'react';


class ProductOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: '',
                description: ''
            }
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({product: newProps.product});
    }

    render() {
        var product = this.state.product;
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
            </div>
        )
    }

}

export default ProductOverview
