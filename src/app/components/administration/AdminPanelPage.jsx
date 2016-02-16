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
            project: null
        };

        this._onProjectsGet = this._onProjectsGet.bind(this);
        this._onCompaniesGet = this._onCompaniesGet.bind(this);
    }

    componentDidMount() {
        ProjectStore.addChangeListener(this._onProjectsGet);
        CompanyStore.addChangeListener(this._onCompaniesGet);
        CompanyActions.getCompanies();
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this._onProjectsGet);
        CompanyStore.removeChangeListener(this._onCompaniesGet);
    }

    render() {
        var { project } = this.state,
            children;

        if (project) {
            children = childrenWithProps(this, { project: project });
        }

        return (
            <div>
                <Navbar/>
                {project
                    ?
                    <Aside project={project}
                           user={this.props.user}
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

    _onCompaniesGet() {
        ProjectActions.getProjects();
    }

    _onProjectsGet() {
        var companies = CompanyStore.companies,
            projectKey = this.props.params.projectKey,
            project = ProjectStore.getProjectByKey(projectKey);
        if (project) {
            this.setState({project: project});
        } else {
            this.context.router.push(`/companies/${companies[0].id}/projects`);
        }
    }


}

AdminPanelPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminPanelPage
