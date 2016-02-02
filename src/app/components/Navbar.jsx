import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchShown: false
        };
    }

    render() {
        var searchClass = classnames('pos-abt w-full h-full blue', {hide: !this.state.searchShown});
        return (
            <div className="navbar md-whiteframe-z1 no-radius blue">
                <a data-md-ink-ripple data-toggle="modal" data-target="#aside"
                   className="navbar-item pull-left visible-xs visible-sm"><i
                    className="mdi-navigation-menu i-24"></i></a>

                <div className="navbar-item pull-left h4"><Link to="/">Freeway</Link></div>
                <ul className="nav nav-sm navbar-tool pull-right">
                    <li>
                        <a data-md-ink-ripple onClick={this._toggleSearch.bind(this)}>
                            <i className="mdi-action-search i-24"></i>
                        </a>
                    </li>
                    <li className="dropdown">
                        <a data-md-ink-ripple data-toggle="dropdown">
                            <i className="mdi-navigation-more-vert i-24"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-scale pull-right pull-up text-color">
                            <li><Link to="/settings">Settings</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                            <li className="divider"></li>
                            <li><Link to="/help">Help &amp; feedback</Link></li>
                        </ul>
                    </li>
                </ul>
                <div className="pull-right"></div>

                <div id="search" className={searchClass}>
                    <div className="box">
                        <div className="box-col w-56 text-center">

                            <a data-md-ink-ripple className="navbar-item inline"
                               onClick={this._toggleSearch.bind(this)}>
                                <i className="mdi-navigation-arrow-back i-24"></i>
                            </a>
                        </div>
                        <div className="box-col v-m">

                            <input className="form-control input-lg no-bg no-border" placeholder="Search"/>
                        </div>

                        <div className="box-col w-56 text-center">
                            <a data-md-ink-ripple className="navbar-item inline"><i
                                className="mdi-av-mic i-24"></i></a>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    _toggleSearch() {
        this.setState({searchShown: !this.state.searchShown});
    }
}

export default MenuItem
