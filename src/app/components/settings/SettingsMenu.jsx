import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-3">
                <ul className="nav nav-lists b-t" ui-nav>
                    <li className="active">
                        <Link to="profile">Your profile</Link>
                    </li>
                    <li >
                        <Link to="manage-projects">Manage Projects</Link>
                    </li>
                    <li>
                        <Link to="manage-teams">Manage Teams</Link>
                    </li>
                    <li>
                        <Link to="manage-company">Manage Company</Link>
                    </li>

                </ul>
            </div>

        )
    }
}

export default App
