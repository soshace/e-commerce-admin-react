import React from 'react';
import classnames from 'classnames';
import {ProductTypeStore} from './../../../stores';
import {ProductTypeActions} from './../../../actions';
import { PRODUCT_ATTR_TYPES } from './../../../constants/MainPageConstants.js';


class ProductTypeDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productType: {
                attributes: []
            },
            attrFormHide: false,
            newAttribute: {
                attributeType: PRODUCT_ATTR_TYPES[0]
            }
        };

        this._onProductTypeGet = this._onProductTypeGet.bind(this);
        this._onFieldUpdate = this._onFieldUpdate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._toggleAttrForm = this._toggleAttrForm.bind(this);
        this._addAttribute = this._addAttribute.bind(this);
        this._removeAttribute = this._removeAttribute.bind(this);
    }

    componentDidMount() {
        var productTypeId = this.props.params.productTypeId,
            withAttrs = true;
        ProductTypeStore.addChangeListener(this._onProductTypeGet);
        ProductTypeActions.getProductType(productTypeId, withAttrs);
    }

    componentWillUnmount() {
        ProductTypeStore.removeChangeListener(this._onProductTypeGet);
    }

    render() {
        var { productType, newAttribute }  = this.state,
            attrFormClass = classnames({hide: this.state.attrFormHide}),
            self = this;
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
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>

                <div className="row">
                    <div className="col-sm-4 col-sm-offset-8">
                        <button className="btn pull-right" onClick={this._toggleAttrForm}>New Attribute</button>
                    </div>
                </div>

                <div className={attrFormClass + " panel panel-default"}>
                    <div className="panel-heading bg-white">
                        {productType.attributes.length} attributes
                    </div>
                    <div className="panel-body">
                        <form className="form-horizontal" role="form" onSubmit={this._addAttribute}>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Name</label>

                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={newAttribute.name}
                                        onChange={this._onAttrFieldUpdate('name')}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Label</label>

                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Label"
                                        value={newAttribute.label}
                                        onChange={this._onAttrFieldUpdate('label')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group form-grouplg">
                                <label className="col-sm-2 control-label">Select</label>
                                <div className="col-sm-10">
                                    <select className="form-control" onChange={this._onAttrFieldUpdate('attributeType')}>
                                        {PRODUCT_ATTR_TYPES.map(function (type) {
                                            return <option key={type} value={type}>{type}</option>
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group m-t">
                                <div className="col-sm-4 col-sm-offset-2">
                                    <button type="submit" className="btn btn-primary">Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Label</th>
                        <th>Constraint</th>
                        <th>Required</th>
                        <th>Searchable</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {productType.attributes.map(function (attr) {
                        return (
                            <tr key={attr.id}>
                                <td>{attr.attributeType}</td>
                                <td>{attr.name}</td>
                                <td>{attr.label}</td>
                                <td>{attr.constraints}</td>
                                <td>{attr.isRequired.toString()}</td>
                                <td>{attr.isSearchable.toString()}</td>
                                <td>
                                    <i className="glyphicon glyphicon-remove" onClick={self._removeAttribute.bind(self, attr.id)}></i>
                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                    <tfoot className="">
                    <tr>
                        <td colSpan="5" className="text-center">
                            <ul className="pagination"></ul>
                        </td>
                    </tr>
                    </tfoot>
                </table>
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

    _onAttrFieldUpdate(field) {
        var self = this;
        return e => {
            var newAttribute = this.state.newAttribute;
            newAttribute[field] = e.target.value;
            self.setState({newAttribute: newAttribute});
        };
    }

    _onSubmit(e) {
        var productType = this.state.productType;
        e.preventDefault();
        ProductTypeActions.updateProductType(productType);
    }

    _onProductTypeGet() {
        this.setState({productType: ProductTypeStore.selectedProductType, attrFormHide: true});
    }

    _toggleAttrForm() {
        this.setState({attrFormHide: !this.state.attrFormHide});
    }

    _addAttribute(e) {
        var { productType, newAttribute } = this.state;
        e.preventDefault();
        newAttribute.productType = productType.id;
        e.preventDefault();
        ProductTypeActions.addAttribute(newAttribute);
    }

    _removeAttribute(id) {
        ProductTypeActions.removeAttribute(id);
    }
}

export default ProductTypeDetail
