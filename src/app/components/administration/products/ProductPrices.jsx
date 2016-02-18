import React from 'react';
import {VariantStore, ProductTypeStore} from './../../../stores';
import {VariantActions} from './../../../actions';
import _ from 'underscore';
import classnames from 'classnames';


class ProductPrices extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variants: [],
            project: null,
            newPrices: {}
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
        this.setState({variants: newProps.variants, project: newProps.project});
    }

    render() {
        var { variants, project, newPrices } = this.state,
            self = this;
        return (
            <div className="panel-body">
                {variants.map(function (variant) {
                    newPrices[variant.id] = newPrices[variant.id] || {};
                    return (
                        <div key={variant.id} className="panel panel-default">
                            <div className="panel-heading bg-white">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="input-group m-b">
                                            <span className="input-group-addon">SKU</span>
                                            <input type="text"
                                                   className="form-control"
                                                   value={variant.sku}
                                                   disabled/>
                                        </div>
                                    </div>
                                    <div
                                        className="label blue col-sm-2">{variant.isMaster ? 'Master variant' : false}</div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>
                                            Currency
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Country
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {variant.prices.map(function (price, index) {
                                        return (
                                            <tr key={price.id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {price.currency}
                                                </td>
                                                <td>
                                                    <input type="text"
                                                           value={price.price}
                                                           onChange={self._onPriceChange.bind(self, price, 'price')}
                                                           className="form-control"
                                                           placeholder="price"/>
                                                </td>
                                                <td>
                                                    country here (to be done)
                                                </td>
                                                <td>
                                                    <a className="glyphicon glyphicon-ok"
                                                       onClick={self._updatePrice.bind(self, price)}></a>
                                                </td>
                                                <td>
                                                    <a className="glyphicon glyphicon-remove"
                                                       onClick={self._removePrice.bind(self, price.id)}></a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td></td>
                                        <td>
                                            {self._generateSelect(project.currency, 'currency')}
                                        </td>
                                        <td>
                                            <input type="text"
                                                   value={newPrices[variant.id].price}
                                                   onChange={self._onNewPriceChange.bind(self, 'price', variant.id)}
                                                   className="form-control"
                                                   placeholder="price"/>
                                        </td>
                                        <td>
                                            country here (to be done)
                                        </td>
                                        <td>
                                            <a className="glyphicon glyphicon-ok"
                                               onClick={self._addPrice.bind(self, variant)}></a>
                                        </td>
                                        <td></td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    _onPriceChange(price, field, e) {
        var { variants } = this.state;
        price[field] = e.target.value;
        this.setState({variants: variants});
    }

    _generateSelect(options, name) {
        return (
            <select name={name} className="form-control">
                {options.map(function (item, index) {
                    return (<option key={index} value={item}>{item}</option>)
                })}
            </select>
        )
    }

    _addPrice(variant) {
        var { newPrices, project } = this.state,
            price = newPrices[variant.id];
        price.variant = variant.id;
        price.product = variant.product;
        price.currency = price.currency || project.currency[0];
        VariantActions.addPrice(price);
    }

    _updatePrice(price) {
        VariantActions.updatePrice(price);
    }

    _removePrice(priceId) {
        VariantActions.removePrice(priceId);
    }

    _onVariantsChange() {
        this.setState({newPrices: {}})
    }

    _onNewPriceChange(field, variantId, e) {
        var { newPrices } = this.state;
        newPrices[variantId][field] = e.target.value;
        this.setState({newPrices: newPrices});
    }

}

export default ProductPrices
