import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';


class AccountMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-3">
                <ul className="nav nav-lists b-t" ui-nav>
                    <li className="active">
                        <Link to={`account/profile`}>Your profile</Link>
                    </li>
                    <li>
                        <Link to={`account/companies`}>Companies</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AccountMenu
