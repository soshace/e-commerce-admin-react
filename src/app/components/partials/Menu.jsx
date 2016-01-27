import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import MenuItem from './MenuItem.jsx';


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navItemsShown: true,
            asideFolded: true
        }
    }

    render() {
        var navClass = classnames({hide: !this.state.navItemsShown}),
            accountClass = classnames('m-v-xs', {hide: this.state.navItemsShown}),
            asideClass = classnames('app-aside modal fade', {folded: this.state.asideFolded});


        return (
            <aside id="aside" className={asideClass} role="menu">
                <div className="left">
                    <div className="box bg-white">
                        <div className="navbar md-whiteframe-z1 no-radius blue">
                            <a className="navbar-brand">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     viewBox="0 0 100 100" enable-background="new 0 0 100 100"
                                     style={{width: "24px",  height: "24px"}}>
                                    <path d="M 50 0 L 100 14 L 92 80 Z" fill="rgba(139, 195, 74, 0.5)"></path>
                                    <path d="M 92 80 L 50 0 L 50 100 Z" fill="rgba(139, 195, 74, 0.8)"></path>
                                    <path d="M 8 80 L 50 0 L 50 100 Z" fill="#f3f3f3"></path>
                                    <path d="M 50 0 L 8 80 L 0 14 Z" fill="rgba(220, 220, 220, 0.6)"></path>
                                </svg>
                                <img src="images/logo.png" alt="." style={{maxHeight: "36px", display: "none"}}/>
                                <span className="hidden-folded m-l inline">Freeway</span>
                            </a>
                        </div>

                        <div className="box-row">
                            <div className="box-cell scrollable hover">
                                <div className="box-inner">
                                    <div className="p hidden-folded blue-50"
                                         style={{backgroundImage: "url(images/bg.png)",  backgroundSize: "cover"}}>
                                        <div className="rounded w-64 bg-white inline pos-rlt">
                                            <img src="images/a0.jpg" className="img-responsive rounded"/>
                                        </div>
                                        <a className="block m-t-sm" onClick={this._toggleNav.bind(this)}>
                                            <span className="block font-bold">John Smith</span>
                                            <span className="pull-right auto">
                                            <i className="fa inline fa-caret-down"></i>
                                            <i className="fa none fa-caret-up"></i>
                                            </span>
                                            john.smith@gmail.com
                                        </a>
                                    </div>
                                    <div id="nav" className={navClass}>
                                        <nav>
                                            <ul className="nav">
                                                <li className="nav-header m-v-sm hidden-folded">Cool Project</li>

                                                <MenuItem link="/companyname/dashboard" name="Dashboard" />
                                                <MenuItem link="/companyname/products" name="Products" />
                                                <MenuItem link="/companyname/products" name="Categories" />
                                                <MenuItem link="/companyname/products" name="Orders" />
                                                <MenuItem link="/companyname/products" name="Orders" />
                                                <MenuItem link="/companyname/products" name="Customers" />
                                                <MenuItem link="/companyname/products" name="Discounts" />
                                                <MenuItem link="/companyname/products" name="Developers" />
                                                <MenuItem link="/companyname/products" name="Imports/Exports" />
                                            </ul>
                                        </nav>
                                    </div>
                                    <div id="account" className={accountClass}>
                                        <nav>
                                            <ul className="nav">
                                                <li>
                                                    <a md-ink-ripple="" href="page.profile.html"
                                                       className=" waves-effect">
                                                        <i className="icon mdi-action-perm-contact-cal i-20"></i>
                                                        <span>My Profile</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a md-ink-ripple="" href="page.settings.html"
                                                       className=" waves-effect">
                                                        <i className="icon mdi-action-settings i-20"></i>
                                                        <span>Settings</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a md-ink-ripple="" href="lockme.html"
                                                       className=" waves-effect">
                                                        <i className="icon mdi-action-exit-to-app i-20"></i>
                                                        <span>Logout</span>
                                                    </a>
                                                </li>
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
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav>
                            <ul className="nav b-t b">
                                <li>
                                    <a href="http://themeforest.net/item/materil-responsive-admin-dashboard-template/11062969"
                                       target="_blank" md-ink-ripple="" className=" waves-effect">
                                        <i className="icon mdi-action-help i-20"></i>
                                        <span>Help &amp; Feedback</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </aside>
        )
    }

    _toggleNav() {
        this.setState({navItemsShown: !this.state.navItemsShown});
    }

    _foldAside() {
        this.setState({asideFolded: !this.state.asideFolded});
    }
}

export default Header;
