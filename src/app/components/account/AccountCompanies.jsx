import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';


class AccountCompanies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: this.props.projects || [],
            companies: this.props.companies || [],
            user: this.props.user,
            project: null
        };
    }

    render() {
        var { companies, projects } = this.state;
        return (
            <div className="col-md-9 b-l bg-white bg-auto">
                {companies.map(function (company) {
                    return (
                        <div key={company.id} className="panel panel-default">
                            <div className="panel-heading bg-white">
                                <h3>{company.name}</h3>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Project name</th>
                                        <th>Key</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {projects.map(function (project) {
                                        if (project.company === company.id)
                                            return (
                                                <tr key={project.id}>
                                                    <td><Link to={`/${project.slug}/dashboard`}>{project.name}</Link></td>
                                                    <td>{project.slug}</td>
                                                </tr>
                                            )
                                    })}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default AccountCompanies
