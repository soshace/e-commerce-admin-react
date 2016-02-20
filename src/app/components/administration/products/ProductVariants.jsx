import React from 'react';
import {VariantStore, ProductTypeStore} from './../../../stores';
import {VariantActions} from './../../../actions';
import _ from 'underscore';
import classnames from 'classnames';
import Input from './../../common/Input.jsx';


class ProductVariants extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variants: [],
            product: {},
            productAttributes: []
        };
        this._onVariantsChange = this._onVariantsChange.bind(this);
        this._addVariant = this._addVariant.bind(this);
        this._removeVariant = this._removeVariant.bind(this);
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
        this.setState({
            project: newProps.project,
            product: newProps.product,
            productAttributes: newProps.productAttributes,
            variants: newProps.variants
        });
    }

    render() {
        var { product, variants, productAttributes } = this.state,
            self = this;
        return (
            <div className="panel-body">
                <button className="btn btn-default" onClick={this._addVariant}>Add Variant</button>
                {variants.map(function (variant) {
                    return (
                        <div key={variant.id} className="panel panel-default">
                            <div className="panel-heading bg-white">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="input-group m-b">
                                            <span className="input-group-addon">SKU</span>
                                            <Input type="text"
                                                   className="form-control"
                                                   value={variant.sku}
                                                   ref={`variant__name-${variant.id}`}
                                                   onChange={self._updateVariant.bind(self, variant.id, 'sku')}
                                                   onKeyPress={self._updateVariant.bind(self, variant.id, 'sku')}
                                                   onBlur={self._updateVariant.bind(self, variant.id, 'sku')}
                                                   placeholder="SKU"/>
                                        </div>
                                    </div>
                                    <div
                                        className="label blue col-sm-2">{variant.isMaster ? 'Master variant' : false}</div>

                                    <a className="glyphicon glyphicon-remove col-sm-1 pull-right"
                                       onClick={self._removeVariant.bind(self, variant.id)}></a>
                                </div>
                            </div>
                            <div className="panel-body">
                                <form className="form-inline" role="form">
                                    {productAttributes.map(function (attr) {
                                        var varAttr = _.findWhere(variant.attributes, {productAttribute: attr.id});
                                        return (
                                            <div key={attr.id} className="form-group">
                                                <div className="col-sm-10">
                                                    <Input type="text"
                                                           ref={`attr-${varAttr.id}`}
                                                           value={varAttr.value}
                                                           onKeyPress={self._onAttrChange.bind(self, varAttr)}
                                                           onChange={self._onAttrChange.bind(self, varAttr)}
                                                           onBlur={self._updateAttr.bind(self, varAttr)}
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

    _addVariant() {
        var product = this.state.product,
            variant = {
                product: product.id,
                productType: product.productType
            };
        VariantActions.createVariant(variant);
    }

    _removeVariant(id) {
        VariantActions.removeVariant(id);
    }

    _onVariantsChange() {
        var variants = VariantStore.selectedVariants,
            updatedAttr = VariantStore.updatedAttribute,
            updatedVariant = VariantStore.updatedVariant,
            input;
        this.setState({variants: variants});
        if (updatedAttr) {
            input = this.refs[`attr-${updatedAttr.id}`];
        }
        if (updatedVariant) {
            input = this.refs[`variant__name-${updatedVariant.id}`];
        }
        if (input) {
            input.showSuccess();
            VariantStore.clearUpdates();
        }

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

    _updateVariant(variantId, field, e) {
        var variants = this.state.variants,
            variant = _.findWhere(variants, {id: variantId});

        if (e.key == 'Enter' || e.type == 'blur') {
            VariantActions.updateVariant(variant);
        } else {
            variant[field] = e.target.value;
            this.setState({variants: variants});
        }
    }

}

export default ProductVariants
