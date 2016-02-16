import React from 'react';
import {CategoryStore, ProjectStore} from './../../../stores';
import {CategoryActions} from './../../../actions';


class NewCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };

        this._onCategoryCreate = this._onCategoryCreate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onFieldUpdate = this._onFieldUpdate.bind(this);
    }

    componentDidMount() {
        CategoryStore.addChangeListener(this._onCategoryCreate);
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._onCategoryCreate);
    }

    render() {
        return (
            <div className="panel-body">
                <form className="form-horizontal p-h-xsform-horizontal p-h-xs"
                      onSubmit={this._onSubmit}>
                    <div className="form-group form-grouplg">
                        <label className="col-sm-2 control-label">Category Name</label>

                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                onChange={this._onFieldUpdate('name')}
                                placeholder="Category name"
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
            projectKey = this.props.params.projectKey,
            project = ProjectStore.getProjectByKey(projectKey),
            projectId = project.id;
        e.preventDefault();
        CategoryActions.createCategory({name, project:projectId});
    }

    _onCategoryCreate() {
        var projectKey = this.props.params.projectKey;
        this.context.router.push(`${projectKey}/categories/`);
    }
}

NewCategory.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default NewCategory
