import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {CompanyActions, ProjectActions} from './../actions';
import {CompanyStore, ProjectStore} from './../stores';


class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchShown: false,
            projects: this.props.projects,
            companies: this.props.companies,
            user: this.props.user
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            projects: newProps.projects,
            companies: newProps.companies,
            user: newProps.user
        });
    }

    render() {
        var { companies, projects } = this.state;

        return (
            <div className="navbar md-whiteframe-z1 no-radius blue">
                <a data-md-ink-ripple data-toggle="modal" data-target="#aside"
                   className="navbar-item pull-left visible-xs visible-sm">
                    <i className="mdi-navigation-menu i-24"></i>
                </a>

                <ul className="nav nav-sm navbar-tool pull-right">
                    <li className="dropdown">
                        <a data-md-ink-ripple data-toggle="dropdown">
                            <i className="mdi-navigation-more-vert i-24"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-scale pull-right pull-up text-color">
                            <li><Link to="/companies/new">Add Company</Link></li>
                            {companies.map(function (c) {
                                return <li key={c.id}><Link to={`/companies/${c.id}`}>{c.name}</Link></li>
                            })}
                            <li className="divider"></li>
                            <li><Link to="/account">Profile Settings</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </ul>
                    </li>
                </ul>

                <ul className="nav nav-sm navbar-tool pull-right">
                    <li className="dropdown">
                        <a data-md-ink-ripple data-toggle="dropdown">
                            {projects.length}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-scale pull-right pull-up text-color">
                            {projects.map(function (p) {
                                // TODO: remove after server api fix (now it can return nulls with a project array)
                                if (!p) return;
                                return <li key={p.id}><Link to={`/${p.slug}`}>{p.name}</Link></li>
                            })}
                        </ul>
                    </li>
                </ul>


                <div className="pull-right"></div>
            </div>
        )
    }
}

export default Navbar
