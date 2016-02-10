import React from 'react';
import {ProductStore, ProjectStore, ProductTypeStore} from './../../../stores';
import {ProductActions, ProductTypeActions, ProjectActions} from './../../../actions';


class ProductAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productTypes: [],
            productTypeId: null,
            product: {}
        };

        this._onProductCreate = this._onProductCreate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onFieldUpdate = this._onFieldUpdate.bind(this);
        this._onProjectsGet= this._onProjectsGet.bind(this);
        this._onProductTypesGet= this._onProductTypesGet.bind(this);
        this._onProductTypeChange= this._onProductTypeChange.bind(this);
    }

    componentDidMount() {
        ProductStore.addChangeListener(this._onProductCreate);
        ProductTypeStore.addChangeListener(this._onProductTypesGet);
        ProjectStore.addChangeListener(this._onProjectsGet);

        ProjectActions.getProjects();
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductCreate);
        ProductTypeStore.removeChangeListener(this._onProductTypesGet);
        ProjectStore.removeChangeListener(this._onProjectsGet);
    }

    render() {
        var productTypes = this.state.productTypes;
        return (
            <div className="panel-body">
                <form className="form-horizontal p-h-xsform-horizontal p-h-xs"
                      onSubmit={this._onSubmit}>
                    <div className="form-group form-grouplg">
                        <label className="col-sm-2 control-label">Product Name</label>

                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                onChange={this._onFieldUpdate('name')}
                                placeholder="Product name"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group form-grouplg">
                        <label className="col-sm-2 control-label">Description</label>

                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                onChange={this._onFieldUpdate('description')}
                                placeholder="Description"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group form-grouplg">
                        <label className="col-sm-2 control-label">Select</label>
                        <div className="col-sm-10">
                            <select className="form-control" onChange={this._onProductTypeChange}>
                                {productTypes.map(function (type) {
                                    return <option key={type.id} value={type.id}>{type.name}</option>
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
        )
    }

    _onProjectsGet() {
        var project = ProjectStore.getProjectByKey(this.props.params.projectKey);
        ProductTypeActions.getProjectProductTypes(project.id);
    }

    _onProductTypesGet() {
        var productTypes = ProductTypeStore.selectedProductTypes;
        this.setState({productTypes: productTypes, productTypeId: productTypes[0].id});
    }

    _onFieldUpdate(field) {
        var self = this;
        return e => {
            var product = this.state.product;
            product[field] = e.target.value;
            self.setState({product: product});
        };
    }

    _onProductTypeChange(e) {
        this.setState({productTypeId: e.target.value});
    }

    _onSubmit(e) {
        var product = this.state.product,
            projectKey = this.props.params.projectKey,
            project = ProjectStore.getProjectByKey(projectKey)
            ;
        product.productType = this.state.productTypeId;
        product.project = project.id;
        e.preventDefault();
        ProductActions.createProduct(product);
    }

    _onProductCreate() {
        var projectKey = this.props.params.projectKey;
        this.context.router.push(`${projectKey}/products/`);
    }
}

ProductAdd.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ProductAdd
