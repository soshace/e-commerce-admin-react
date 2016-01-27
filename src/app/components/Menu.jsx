import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import MenuItem from './MenuItem.jsx';


class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navItemsShown: true,
            asideFolded: true
        };

        this.props = {
            menuClass: '',
            header: ''
        }
    }

    render() {
        var menuClass = this.props.className,
            header = (<li className="nav-header m-v-sm hidden-folded">{this.props.header}</li>);

        return (
            <div className={menuClass}>
                <nav>
                    <ul className="nav">
                        {header}
                        {this.props.children}
                    </ul>
                </nav>
            </div>
        )
    }

    _toggleNav() {
        this.setState({navItemsShown: !this.state.navItemsShown});
    }

    _foldAside() {
        this.setState({asideFolded: !this.state.asideFolded});
    }
}

export default Menu;
