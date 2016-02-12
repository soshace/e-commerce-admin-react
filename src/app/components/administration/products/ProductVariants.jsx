import React from 'react';
import {VariantStore, ProductTypeStore} from './../../../stores';
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
        this._onAttrChange = this._onAttrChange.bind(this);
        this._updateAttr = this._updateAttr.bind(this);
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
                                        var varAttr = _.findWhere(variant.attributes, {productAttribute: attr.id});
                                        return (
                                            <div key={attr.id} className="form-group">
                                                <div className="col-sm-10">
                                                    <input type="text"
                                                           value={varAttr.value}
                                                           onKeyPress={self._onAttrChange.bind(self, varAttr)}
                                                           onChange={self._onAttrChange.bind(self, varAttr)}
                                                           className="form-control"
                                                           placeholder={attr.name}/>
                                                </div>
                                            </div>
                                        )
                                    })}
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

    _onAttrChange(variantAttr, e) {
        var variants = this.state.variants;
        if (e.key == 'Enter') {
            this._updateAttr(variantAttr);
        } else {
            variantAttr.value = e.target.value;
            this.setState({variants: variants});
        }
    }

    _updateAttr(variantAttr) {
        VariantActions.updateAttribute(variantAttr);
    }

}

export default ProductVariants
