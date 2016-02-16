import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Navbar from './../Navbar.jsx';
import AccountMenu from './AccountMenu.jsx';
import {ProjectStore} from './../../stores';
import { childrenWithProps } from './../../utils/utils.js';


class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: this.props.projects,
            companies: this.props.companies,
            user: this.props.user,
            project: ProjectStore.getProjectByKey(this.props.params.projectKey)
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            projects: newProps.projects,
            companies: newProps.companies,
            user: newProps.user,
            project: ProjectStore.getProjectByKey(newProps.params.projectKey)
        });
    }

    render() {
        var { companies, projects, project, user } = this.state,
            children = childrenWithProps(this, {user});
        return (
            <div>
                <Navbar project={project}
                        user={user}
                        projects={projects}
                        companies={companies}
                />

                <div className="app-content">
                    <div className="p-h-md p-v bg-white box-shadow pos-rlt">
                        <h3 className="no-margin">Account</h3>
                    </div>
                    <div className="box">
                        <AccountMenu />
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Account
