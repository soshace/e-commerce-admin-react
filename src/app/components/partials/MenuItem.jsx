import React from 'react';
import { Link } from 'react-router'

class Header extends React.Component {

    render() {
        return (
            <li>
                <Link to={this.props.link} md-ink-ripple="" className=" waves-effect">
                    <i className="icon mdi-action-settings-input-svideo i-20"></i>
                    <span className="font-normal">{this.props.name}</span>
                </Link>
            </li>
        )
    }
}

export default Header
