import React from 'react';
import ProjectStore from './../../stores/ProjectStore.js';
import ProjectActions from './../../actions/ProjectActions.js';
import ProjectConstants from './../../constants/ProjectConstants.js';


class NewProject extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            slug: '',
            name: '',
            language: ProjectConstants.PROJECT_LANGUAGES[0].key,
            currency: ProjectConstants.PROJECT_CURRENCIES[0].key
        };

        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onFieldUpdate = this._onFieldUpdate.bind(this);
    }

    componentDidMount() {
        ProjectStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <div className="box-row">
                <div className="box-cell scrollable hover">
                    <div className="box-inner padding">
                        <div className="panel panel-default">
                            <div className="panel-heading bg-white">
                                <p>Basic form</p>
                                <small className="text-muted">
                                    There would be some interesting text
                                </small>
                            </div>

                            <div className="panel-body">
                                <form className="form-horizontal p-h-xsform-horizontal p-h-xs"
                                      onSubmit={this._onSubmit}>
                                    <div className="form-group form-group-lg">
                                        <label className="col-sm-2 control-label">Project Name</label>

                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={this._onFieldUpdate('name')}
                                                placeholder="Project name"/>
                                        </div>
                                    </div>
                                    <div className="form-group form-group-lg">
                                        <label className="col-sm-2 control-label">Project Slug</label>

                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={this._onFieldUpdate('slug')}
                                                placeholder="Project Slug"/>
                                        </div>
                                    </div>
                                    <div className="form-group form-group-lg">
                                        <label className="col-sm-2 control-label">Currency</label>

                                        <div className="col-sm-10">
                                            {this._generateSelect(ProjectConstants.PROJECT_CURRENCIES, 'currency')}
                                        </div>
                                    </div>
                                    <div className="form-group form-group-lg">
                                        <label className="col-sm-2 control-label">Language</label>

                                        <div className="col-sm-10">
                                            {this._generateSelect(ProjectConstants.PROJECT_LANGUAGES, 'language')}
                                        </div>
                                    </div>
                                    <div className="form-group m-t-lg">
                                        <div className="col-sm-4 col-sm-offset-2">
                                            <button type="submit" className="btn btn-primary">Create</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _onSubmit(e) {
        var {name, slug, currency, language} = this.state;
        e.preventDefault();
        ProjectActions.addProject(name, slug, currency, language);
    }

    _generateSelect(options, name) {
        return (
            <select name={name} className="form-control" onChange={this._onFieldUpdate(name)}>
                {options.map(function (item) {
                    return (<option key={item.key} value={item.key}>{item.text}</option>)
                })}
            </select>
        )
    }

    _onFieldUpdate(field) {
        var self = this;
        return e => {
            self.setState({[field]: e.target.value});
        };
    }

    _onChange() {
        var projectSlug = ProjectStore.projects[0].slug;
        this.context.router.push(projectSlug + '/dashboard');
    }
}

NewProject.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default NewProject
