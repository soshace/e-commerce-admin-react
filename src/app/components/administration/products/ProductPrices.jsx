import React from 'react';
import {VariantStore, ProductTypeStore} from './../../../stores';
import {VariantActions} from './../../../actions';
import _ from 'underscore';
import classnames from 'classnames';


class ProductPrices extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variants: []
        };

    }

    componentDidMount() {
        VariantStore.addChangeListener(this._onVariantsChange);
    }

    componentWillUnmount() {
        VariantStore.removeChangeListener(this._onVariantsChange);
    }

    componentWillReceiveProps(newProps) {
        this.setState({variants: newProps.variants});
    }

    render() {
        var { variants, newImages } = this.state,
            self = this;
        return (
            <div className="panel-body">
                {variants.map(function (variant) {
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
                                                    {price.price}
                                                </td>
                                                <td>
                                                    {price.country}
                                                </td>
                                            </tr>
                                        )
                                    })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    _onVariantsChange() {

    }

    //_onNewImageChange(field, variantId, e) {
    //    var newImages = this.state.newImages;
    //    newImages[variantId][field] = e.target.value;
    //    this.setState({newImages: newImages});
    //}
    //
    //_addImage(variant, e) {
    //    var newImages = this.state.newImages,
    //        image = newImages[variant.id];
    //    image.variant = variant.id;
    //    image.product = variant.product;
    //    VariantActions.addImage(image);
    //    e.preventDefault();
    //}
    //
    //_uploadImage(variant, e) {
    //    var file,
    //        image = new FormData();
    //    if (e.dataTransfer) {
    //        file = e.dataTransfer.files[0];
    //    } else {
    //        file = e.target.files[0];
    //    }
    //    image.append('image', file);
    //    VariantActions.uploadImage(image, variant);
    //    e.preventDefault();
    //}
    //
    //_removeImage(imageId) {
    //    VariantActions.removeImage(imageId);
    //}

}

export default ProductPrices
