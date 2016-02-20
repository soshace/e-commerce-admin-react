import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';


class AccountMenu extends React.Component {
    render() {
        return (
            <ul className="nav nav-lists b-t">
                <li className="active">
                    <Link to={`/account/profile`}>Your profile</Link>
                </li>
                <li>
                    <Link to={`/account/companies`}>Companies</Link>
                </li>
            </ul>
        )
    }
}

export default AccountMenu
