import React from 'react';
import {VariantStore, ProjectStore} from './../../../stores';
import {VariantActions, ProjectActions, ProductActions} from './../../../actions';
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
        this.setState({project: newProps.project, product: newProps.product});
    }

    render() {
        var variants = this.state.variants,
            self = this,
            product = this.state.product;
        return (
            <div className="panel-body">
                {variants.map(function (variant) {
                    return (
                        <div className="row" key={variant.id}>
                            <label className="col-sm-2 control-label">id: {variant.id}</label>
                            <div className="col-sm-10">isMaster: {variant.isMaster ? 'true' : 'false'}</div>
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
