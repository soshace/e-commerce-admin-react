import React from 'react';
import classnames from 'classnames';
import CompanyMenu from './CompanyMenu.jsx';
import {CompanyActions} from './../../actions';
import {CompanyStore, ProjectStore} from './../../stores';
import Navbar from './../Navbar.jsx';
import { childrenWithProps } from './../../utils/utils.js';


class Company extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: CompanyStore.getCompanyById(this.props.params.companyId),
            projects: this.props.projects || [],
            companies: this.props.companies || [],
            user: this.props.user,
            project: ProjectStore.getProjectByKey(this.props.params.projectKey)
        };
    }

    componentWillReceiveProps(newProps) {
        var id = newProps.params.companyId,
            company= CompanyStore.getCompanyById(id);
        this.setState({company: company});
    }

    render() {
        var { companies, projects, company, project, user } = this.state,
            id = this.props.params.companyId,
            children = childrenWithProps(this, {company});

        return (
            <div>
                <Navbar project={project}
                        user={user}
                        projects={projects}
                        companies={companies}
                />

                <div className="app-content">
                    <div className="p-h-md p-v bg-white box-shadow pos-rlt">
                        <h3 className="no-margin">Company Settings: {company.name}</h3>
                    </div>
                    <div className="box panel">
                        <CompanyMenu id={id}/>

                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Company
