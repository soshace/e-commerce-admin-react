import React from 'react';
import {ImageStore, ProductTypeStore} from './../../../stores';
import {ImageActions} from './../../../actions';
import _ from 'underscore';
import classnames from 'classnames';


class ProductVariants extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variants: [],
            product: {},
            productAttributes: []
        };

    }

    componentDidMount() {
        ImageStore.addChangeListener(this._onImagesChange);
    }

    componentWillUnmount() {
        ImageStore.removeChangeListener(this._onImagesChange);
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
        var { variants } = this.state,
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
                                {variant.images.map(function (img) {
                                    return <img key={img.id} src={img.uri} className="b p-xs img-rounded" width="150" height="110" />
                                })}
                            </div>
                        </div>

                    )
                })}
            </div>
        )
    }

    _onImagesChange() {

    }

}

export default ProductVariants
