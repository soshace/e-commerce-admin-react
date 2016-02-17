import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';


class CompanyMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var id = this.props.id;
        return (
            <ul className="nav nav-lists b-t">
                <li className="active">
                    <Link to={`/companies/${id}/profile`}>Company account</Link>
                </li>
                <li>
                    <Link to={`/companies/${id}/projects`}>Manage Projects</Link>
                </li>
                <li>
                    <Link to={`/companies/${id}/teams`}>Manage Teams</Link>
                </li>
            </ul>
        )
    }
}

export default CompanyMenu
