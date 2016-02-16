import React from 'react';
import classnames from 'classnames';
import Aside from './Aside.jsx';
import Navbar from './../Navbar.jsx';
import {ProjectActions, CompanyActions} from './../../actions';
import {ProjectStore, CompanyStore} from './../../stores';
import { childrenWithProps } from './../../utils/utils.js';


class AdminPanelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: this.props.projects,
            companies: this.props.companies,
            user: this.props.user,
            project: null
        };
    }

    componentWillMount() {
        var { companies } = this.state,
            projectKey = this.props.params.projectKey,
            project = ProjectStore.getProjectByKey(projectKey);
        if (project) {
            this.setState({project: project});
        } else {
            this.context.router.push(`/companies/${companies[0].id}/projects`);
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            projects: newProps.projects,
            companies: newProps.companies,
            user: newProps.user
        });
    }

    render() {
        var { project, projects, companies, user } = this.state,
            children;

        if (project) {
            children = childrenWithProps(this, { project, projects, companies, user });
        }

        return (
            <div>
                {project
                    ?
                    <Navbar project={project}
                            user={user}
                            projects={projects}
                            companies={companies}
                    />
                    :
                    null
                }
                {project
                    ?
                    <Aside project={project}
                           user={user}
                           projects={projects}
                           companies={companies}
                    />
                    :
                    null
                }


                <div id="content" className="app-content" role="main">
                    <div className="box">
                        <div className="box-row">
                            <div className="box-cell padding">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

AdminPanelPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminPanelPage
