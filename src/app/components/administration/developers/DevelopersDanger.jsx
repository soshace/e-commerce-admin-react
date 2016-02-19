import React from 'react';
import { childrenWithProps } from './../../../utils/utils.js';
import {ProjectStore} from './../../../stores';
import {ProjectActions} from './../../../actions';


class DevelopersDanger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: this.props.project
        };

        this._onProjectsChange = this._onProjectsChange.bind(this);
        this._deleteProject = this._deleteProject.bind(this);
    }

    componentDidMount() {
        ProjectStore.addChangeListener(this._onProjectsChange);
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this._onProjectsChange);
    }

    componentWillReceiveProps(newProps) {
        this.setState({project: newProps.project});
    }

    render() {
        return (
            <div>
                <button data-md-ink-ripple
                        onClick={this._deleteProject}
                        className="btn btn-fw btn-danger waves-effect waves-effect">
                    Delete project
                </button>
            </div>
        )
    }

    _deleteProject() {
        var {project} = this.state;
        this.setState({companyId: project.company});
        ProjectActions.deleteProject(project);
    }

    _onProjectsChange() {
        var {companyId} = this.state;
        this.context.router.push(`/companies/${companyId}/projects`);
    }
}

DevelopersDanger.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default DevelopersDanger
