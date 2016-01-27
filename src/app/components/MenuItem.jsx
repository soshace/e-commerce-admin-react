import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

class MenuItem extends React.Component {

    render() {
        var iconClass = classnames('icon i-20', this.props.iconClass);
        return (
            <li>
                <Link to={this.props.link} data-md-ink-ripple="" className=" waves-effect">
                    <i className={iconClass}></i>
                    <span className="font-normal">{this.props.name}</span>
                </Link>
            </li>
        )
    }
}

export default MenuItem
