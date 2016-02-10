import React from 'react';
import {ProductTypeStore, ProjectStore} from './../../../stores';
import {ProductTypeActions} from './../../../actions';


class ProductTypeAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: ''
        };

        this._onProductTypeCreate = this._onProductTypeCreate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onFieldUpdate = this._onFieldUpdate.bind(this);
    }

    componentDidMount() {
        ProductTypeStore.addChangeListener(this._onProductTypeCreate);
    }

    componentWillUnmount() {
        ProductTypeStore.removeChangeListener(this._onProductTypeCreate);
    }

    render() {
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
                                onChange={this._onFieldUpdate('description')}
                                placeholder="Description"
                                required
                            />
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

    _onFieldUpdate(field) {
        var self = this;
        return e => {
            self.setState({[field]: e.target.value});
        };
    }

    _onSubmit(e) {
        var {name, description} = this.state,
            projectKey = this.props.params.projectKey,
            project = ProjectStore.getProjectByKey(projectKey);
        e.preventDefault();
        ProductTypeActions.createProductType({name, description, project:project.id});
    }

    _onProductTypeCreate() {
        var projectKey = this.props.params.projectKey,
            productType = ProductTypeStore.selectedProductType;
        this.context.router.push(`/${projectKey}/developers/types/${productType.id}`);
    }
}

ProductTypeAdd.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ProductTypeAdd
