import React from 'react';
import {ProductStore, ProjectStore} from './../../../stores';
import {ProductActions} from './../../../actions';


class NewProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: ''
        };

        this._onProductCreate = this._onProductCreate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onFieldUpdate = this._onFieldUpdate.bind(this);
    }

    componentDidMount() {
        ProductStore.addChangeListener(this._onProductCreate);
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductCreate);
    }

    render() {
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
        var name = this.state.name,
            description = this.state.description,
            projectKey = this.props.params.projectKey,
            project = ProjectStore.getProjectByKey(projectKey),
            projectId = project.id;
        e.preventDefault();
        ProductActions.createProduct({name, description, project:projectId});
    }

    _onProductCreate() {
        var projectKey = this.props.params.projectKey;
        this.context.router.push(`${projectKey}/products/`);
    }
}

NewProduct.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default NewProduct
