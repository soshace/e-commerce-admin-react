import React from 'react';
import classnames from 'classnames';
import Aside from './Aside.jsx';
import API from './../../constants/DashboardConstants.js';
import DashboardStore from './../../stores/DashboardStore.js';
import DashboardActions from './../../actions/DashboardActions.js';


class AdminPanelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchShown: false,
            profile: {}
        };
    }

    componentDidMount() {
        DashboardActions.getProfile();
        DashboardStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        DashboardStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState({profile: DashboardStore.profile});
    }

    render() {
        var searchClass = classnames('pos-abt w-full h-full blue', {hide: !this.state.searchShown});

        return (
            <div>
                <Aside profile={this.state.profile} />

                <div id="content" className="app-content" role="main">
                    <div className="box">

                        <div className="navbar md-whiteframe-z1 no-radius blue">
                            <a data-md-ink-ripple data-toggle="modal" data-target="#aside"
                               className="navbar-item pull-left visible-xs visible-sm"><i
                                className="mdi-navigation-menu i-24"></i></a>
                            <div className="navbar-item pull-left h4">Dashboard</div>
                            <ul className="nav nav-sm navbar-tool pull-right">
                                <li>
                                    <a data-md-ink-ripple onClick={this._toggleSearch.bind(this)}>
                                        <i className="mdi-action-search i-24"></i>
                                    </a>
                                </li>
                                <li>
                                    <a data-md-ink-ripple data-toggle="modal" data-target="#user">
                                        <i className="mdi-social-person-outline i-24"></i>
                                    </a>
                                </li>
                                <li className="dropdown">
                                    <a data-md-ink-ripple data-toggle="dropdown">
                                        <i className="mdi-navigation-more-vert i-24"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-scale pull-right pull-up text-color">
                                        <li><a href>Single-column view</a></li>
                                        <li><a href>Sort by date</a></li>
                                        <li><a href>Sort by name</a></li>
                                        <li className="divider"></li>
                                        <li><a href>Help &amp; feedback</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="pull-right"></div>

                            <div id="search" className={searchClass}>
                                <div className="box">
                                    <div className="box-col w-56 text-center">

                                        <a data-md-ink-ripple className="navbar-item inline" onClick={this._toggleSearch.bind(this)}>
                                            <i className="mdi-navigation-arrow-back i-24"></i>
                                        </a>
                                    </div>
                                    <div className="box-col v-m">

                                        <input className="form-control input-lg no-bg no-border" placeholder="Search" />
                                    </div>

                                    <div className="box-col w-56 text-center">
                                        <a data-md-ink-ripple className="navbar-item inline"><i className="mdi-av-mic i-24"></i></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="box-row">
                            <div className="box-cell">
                                <div className="box-inner padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            {this.props.children}
                                        </div>
                                    </div>

                                </div>
                            </div>
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

export default AdminPanelPage
