import React from 'react';
import {VariantStore} from './../../../stores';
import {VariantActions} from './../../../actions';
import _ from 'underscore';


class ProductVariants extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variants: [],
            product: {}
        };
        this._onVariantsChange = this._onVariantsChange.bind(this);
    }

    componentDidMount() {
        VariantStore.addChangeListener(this._onVariantsChange);
    }

    componentWillUnmount() {
        VariantStore.removeChangeListener(this._onVariantsChange);
    }

    componentWillReceiveProps(newProps) {
        VariantActions.getProductVariants(newProps.product.id);
        this.setState({
            project: newProps.project,
            product: newProps.product,
            productAttributes: newProps.productAttributes
        });
    }

    render() {
        var { product, variants, productAttributes } = this.state,
            self = this;
        return (
            <div className="panel-body">
                {variants.map(function (variant) {
                    return (
                        <div key={variant.id} className="panel panel-default">
                            <div className="panel-heading bg-white">
                                <span className="label blue">{variant.isMaster ? 'Master variant' : false}</span>
                            </div>
                            <div className="panel-body">
                                <form className="form-inline" role="form">
                                    {productAttributes.map(function (attr) {
                                        return (
                                            <div key={attr.id} className="form-group">
                                                <div className="col-sm-10">
                                                    <input type="text"
                                                           className="form-control"
                                                           placeholder={attr.name}/>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-10">
                                            <button type="submit" className="btn btn-default">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    )
                })}
            </div>
        )
    }

    _onVariantsChange() {
        var variants = VariantStore.selectedVariants;
        this.setState({variants: variants});
    }

}

export default ProductVariants
