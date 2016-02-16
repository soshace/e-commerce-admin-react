import React from 'react';
import { Link } from 'react-router';
import {ProjectStore} from './../../stores';
import {ProjectActions} from './../../actions';
import AppConstants from './../../constants/AppConstants.js';


class ManageProjects extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            slug: '',
            name: '',
            language: AppConstants.PROJECT_LANGUAGES[0].key,
            currency: AppConstants.PROJECT_CURRENCIES[0].key,
            projects: []
        };

        this._onProjectsGet = this._onProjectsGet.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onFieldUpdate = this._onFieldUpdate.bind(this);
        this._onNameKeyPress = this._onNameKeyPress.bind(this);
    }

    componentDidMount() {
        var companyId = this.props.params.id;
        ProjectStore.addChangeListener(this._onProjectsGet);
        ProjectActions.getCompanyProjects(companyId);
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this._onProjectsGet);
    }

    render() {
        var projects = this.state.projects,
            self = this;

        return (
            <div className="col-md-9 b-l bg-white bg-auto">
                <div className="panel panel-default">
                    <div className="panel-heading bg-white">
                        <p>Basic form</p>
                        <small className="text-muted">
                            There would be some interesting text
                        </small>
                    </div>

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Key</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects && projects.map(function (project, index) {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={project.name}
                                            onKeyPress={self._onNameKeyPress.bind(self, project.id)}
                                            placeholder="Project name"/>
                                    </td>
                                    <td><Link to={`${project.slug}/dashboard`}>{project.slug}</Link></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    <div className="panel-body">
                        <form className="form-horizontal p-h-xsform-horizontal p-h-xs"
                              onSubmit={this._onSubmit}>
                            <div className="form-group form-grouplg">
                                <label className="col-sm-2 control-label">Project Name</label>

                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={this._onFieldUpdate('name')}
                                        placeholder="Project name"/>
                                </div>
                            </div>
                            <div className="form-group form-group">
                                <label className="col-sm-2 control-label">Project Slug</label>

                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={this._onFieldUpdate('slug')}
                                        placeholder="Project Slug"/>
                                </div>
                            </div>
                            <div className="form-group form-group">
                                <label className="col-sm-2 control-label">Currency</label>

                                <div className="col-sm-10">
                                    {this._generateSelect(AppConstants.PROJECT_CURRENCIES, 'currency')}
                                </div>
                            </div>
                            <div className="form-group form-group">
                                <label className="col-sm-2 control-label">Language</label>

                                <div className="col-sm-10">
                                    {this._generateSelect(AppConstants.PROJECT_LANGUAGES, 'language')}
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
            </div>
        )
    }

    _onNameKeyPress(id, e) {
        if (e.key == 'Enter') {
            var data = {
                name: e.target.value
            };
            ProjectActions.updateProject(id, data);
        }
    }

    _onSubmit(e) {
        var companyId = this.props.params.id;
        var {name, slug, currency, language} = this.state;
        e.preventDefault();
        ProjectActions.createProject(name, slug, currency, language, companyId);
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

    _onProjectsGet() {
        var companyId = this.props.params.id,
            projects = ProjectStore.companyProjects[companyId];
        this.setState({projects: projects});
        //var projectSlug = ProjectStore.projects[0].slug;
        //this.context.router.push(`${projectSlug}/dashboard`);
    }
}

ManageProjects.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ManageProjects
