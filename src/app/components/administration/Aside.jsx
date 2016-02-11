import React from 'react';
import classnames from 'classnames';
import Menu from './../Menu.jsx';
import MenuItem from './../MenuItem.jsx';
import ProfileInfo from './ProfileInfo.jsx';

import {UserStore} from './../../stores';
import {UserActions} from './../../actions';


class Aside extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navItemsShown: true,
            asideFolded: true,
            user: {
                name: '',
                email: ''
            }
        };

        this._onUserGet = this._onUserGet.bind(this);
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onUserGet);
        UserActions.getUser();
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserGet);
    }

    render() {
        var navClass = classnames({hide: !this.state.navItemsShown}),
            accountClass = classnames('m-v-xs', {hide: this.state.navItemsShown}),
            //asideClass = classnames('app-aside modal fade', {folded: this.state.asideFolded}),
            asideClass = classnames('app-aside modal fade'),
            user = this.state.user,
            projectKey = this.props.projectKey;


        return (
            <aside id="aside" className={asideClass} role="menu">
                <div className="left">
                    <div className="box bg-white">
                        <div className="navbar md-whiteframe-z1 no-radius blue">
                            <a className="navbar-brand">
                                <span className="hidden-folded m-l inline">Freeway</span>
                            </a>
                        </div>

                        <div className="box-row">
                            <div className="box-cell scrollable hover">
                                <div className="box-inner">

                                    <ProfileInfo
                                        onClick={this._toggleNav.bind(this)}
                                        avatarSrc="images/a0.jpg"
                                        name={user.name}
                                        email={user.email} />

                                    <Menu header="Cool Project" className={navClass}>
                                        <MenuItem link={`/${projectKey}/dashboard`} name="Dashboard" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link={`/${projectKey}/products`} name="Products" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link={`/${projectKey}/categories`} name="Categories" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Orders" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Customers" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Discounts" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link={`/${projectKey}/developers`} name="Developers" iconClass="mdi-action-perm-contact-cal" />
                                        <MenuItem link="/companyname/products" name="Imports/Exports" iconClass="mdi-action-perm-contact-cal" />
                                    </Menu>
                                    <Menu header="Cool Project" className={accountClass}>
                                        <MenuItem link="/companyname/dashboard" name="My Profile" iconClass="mdi-action-perm-contact-cal"/>
                                        <MenuItem link="/companyname/products" name="Settings" iconClass="mdi-action-settings" />
                                        <MenuItem link="/logout" name="Logout" iconClass="mdi-action-exit-to-app" />
                                        <li className="m-v-sm b-b b"></li>
                                        <li>
                                            <div className="nav-item">
                                                <label className="md-check">
                                                    <input type="checkbox" onChange={this._foldAside.bind(this)}/>
                                                    <i className="purple no-icon"></i>
                                                            <span
                                                                className="hidden-folded">Folded aside</span>
                                                </label>
                                            </div>
                                        </li>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <nav>
                            <Menu className="nav b-t b">
                                <li>
                                    <a href="http://google.com" target="_blank" data-md-ink-ripple="" className=" waves-effect">
                                        <i className="icon mdi-action-help i-20"></i>
                                        <span>Help &amp; Feedback</span>
                                    </a>
                                </li>
                            </Menu>
                        </nav>
                    </div>
                </div>
            </aside>
        )
    }

    _onUserGet() {
        var user = UserStore.user;
        this.setState({user: user});
    }

    _toggleNav() {
        this.setState({navItemsShown: !this.state.navItemsShown});
    }

    _foldAside() {
        this.setState({asideFolded: !this.state.asideFolded});
    }
}

Aside.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Aside
