import React from 'react';
import classnames from 'classnames';
import Header from './components/partials/Header.jsx';
import Menu from './components/partials/Menu.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchShown: false
        };

        this._initWaves();
    }

    render() {
        var searchClass = classnames('pos-abt w-full h-full blue', {hide: !this.state.searchShown});

        return (
            <div>
                <Menu />

                <div id="content" className="app-content" role="main">
                    <div className="box">

                        <div className="navbar md-whiteframe-z1 no-radius blue">
                            <a md-ink-ripple data-toggle="modal" data-target="#aside"
                               className="navbar-item pull-left visible-xs visible-sm"><i
                                className="mdi-navigation-menu i-24"></i></a>
                            <div className="navbar-item pull-left h4">Dashboard</div>
                            <ul className="nav nav-sm navbar-tool pull-right">
                                <li>
                                    <a md-ink-ripple onClick={this._toggleSearch.bind(this)}>
                                        <i className="mdi-action-search i-24"></i>
                                    </a>
                                </li>
                                <li>
                                    <a md-ink-ripple data-toggle="modal" data-target="#user">
                                        <i className="mdi-social-person-outline i-24"></i>
                                    </a>
                                </li>
                                <li className="dropdown">
                                    <a md-ink-ripple data-toggle="dropdown">
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
                            <div className="pull-right" ui-view="navbar@"></div>

                            <div id="search" className={searchClass}>
                                <div className="box">
                                    <div className="box-col w-56 text-center">

                                        <a md-ink-ripple className="navbar-item inline" onClick={this._toggleSearch.bind(this)}>
                                            <i className="mdi-navigation-arrow-back i-24"></i>
                                        </a>
                                    </div>
                                    <div className="box-col v-m">

                                        <input className="form-control input-lg no-bg no-border" placeholder="Search" />
                                        </div>

                                        <div className="box-col w-56 text-center">
                                            <a md-ink-ripple className="navbar-item inline"><i className="mdi-av-mic i-24"></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="box-row">
                                <div className="box-cell">
                                    <div className="box-inner padding">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="panel panel-default">
                                                    <div className="panel-heading bg-white">
                                                        <span className="label pull-right m-t-xs amber">4 left</span>
                                                        <span className="h4">Tasks</span>
                                                    </div>
                                                    <table className="table m-b-none">
                                                        <thead>
                                                        <tr>
                                                            <th>Progress</th>
                                                            <th>Item</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <div
                                                                    className="progress progress-xs progress-striped active no-margin m-v-sm">
                                                                    <div className="progress-bar bg-success"
                                                                         data-toggle="tooltip"
                                                                         data-original-title="80%"
                                                                         style={{width: "80%"}}></div>
                                                                </div>
                                                            </td>
                                                            <td>App prototype design</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="progress progress-xs no-margin m-v-sm">
                                                                    <div className="progress-bar bg-info"
                                                                         data-toggle="tooltip"
                                                                         data-original-title="40%"
                                                                         style={{width: "40%"}}></div>
                                                                </div>
                                                            </td>
                                                            <td>Design documents</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="progress progress-xs no-margin m-v-sm">
                                                                    <div className="progress-bar bg-warning"
                                                                         data-toggle="tooltip"
                                                                         data-original-title="20%"
                                                                         style={{width: "20%"}}></div>
                                                                </div>
                                                            </td>
                                                            <td>UI toolkit</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="progress progress-xs no-margin m-v-sm">
                                                                    <div className="progress-bar bg-danger"
                                                                         data-toggle="tooltip"
                                                                         data-original-title="15%"
                                                                         style={{width: "15%"}}></div>
                                                                </div>
                                                            </td>
                                                            <td>Testing</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

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

    _initWaves() {
        Waves.attach('.btn');
        Waves.attach('[md-ink-ripple]');
        Waves.init();
    }

    _toggleSearch() {
        this.setState({searchShown: !this.state.searchShown});
    }
}

export default App
