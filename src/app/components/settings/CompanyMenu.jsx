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
                        <Link to="company/profile">Company account</Link>
                    </li>
                    <li>
                        <Link to="company/projects">Manage Projects</Link>
                    </li>
                    <li>
                        <Link to="company/teams">Manage Teams</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default App
