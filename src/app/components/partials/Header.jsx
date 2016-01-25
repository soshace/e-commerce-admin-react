import React from 'react';
import { Link } from 'react-router'

class Header extends React.Component {

    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">main</Link></li>
                    <li><Link to="/administration">administration</Link></li>
                </ul>
            </div>
        )
    }
}

export default Header
