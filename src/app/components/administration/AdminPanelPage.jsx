import React from 'react';
import classnames from 'classnames';
import Aside from './Aside.jsx';
import API from './../../constants/ProjectConstants.js';
import ProjectStore from './../../stores/ProjectStore.js';
import CompanyStore from './../../stores/CompanyStore.js';
import ProjectActions from './../../actions/ProjectActions.js';
import CompanyActions from './../../actions/CompanyActions.js';
import Navbar from './../Navbar.jsx';


class AdminPanelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            companies: []
        };

        this._onChange = this._onChange.bind(this);
        this._onCompaniesGet = this._onCompaniesGet.bind(this);
    }

    componentDidMount() {
        var companies = CompanyStore.companies;

        if (companies) {
            this.setState({companies: companies});
            this._onCompaniesGet();
        } else {
            CompanyActions.getCompanies();
        }

        ProjectStore.addChangeListener(this._onChange);
        CompanyStore.addChangeListener(this._onCompaniesGet);
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this._onChange);
        CompanyStore.removeChangeListener(this._onCompaniesGet);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Aside profile={this.state.profile}/>

                <div id="content" className="app-content" role="main">
                    <div className="box">
                        <div className="box-row">
                            <div className="box-cell">
                                <div className="box-inner padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            {this.props.children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _onChange() {
        var projects = ProjectStore.projects,
            profile = ProjectStore.profile,
            companies = this.state.companies;
        this.setState({profile: profile});

        if (profile) {
            if (projects) {
                if (!projects.length) {
                    this.context.router.push(`companies/${companies[0].id}/projects`);
                }
            } else {
                ProjectActions.getProjects();
            }
        }
    }


    _onCompaniesGet() {
        var profile = ProjectStore.profile,
            companies = CompanyStore.companies;
        this.setState({companies: companies});

        if (profile) {
            this.setState({profile: profile});
        } else {
            ProjectActions.getProfile();
        }
    }
}

AdminPanelPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminPanelPage
