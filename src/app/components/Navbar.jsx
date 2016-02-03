import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import CompanyActions from './../actions/CompanyActions.js';
import CompanyStore from './../stores/CompanyStore.js';


class MenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchShown: false,
            companies: []
        };

        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        var companies = CompanyStore.companies;
        CompanyStore.addChangeListener(this._onChange);

        if (companies) {
            this.setState({companies: companies});
        } else {
            CompanyActions.getCompanies();
        }
    }

    componentWillUnmount() {
        CompanyStore.removeChangeListener(this._onChange);
    }

    render() {
        var companies = this.state.companies;

        return (
            <div className="navbar md-whiteframe-z1 no-radius blue">
                <a data-md-ink-ripple data-toggle="modal" data-target="#aside"
                   className="navbar-item pull-left visible-xs visible-sm"><i
                    className="mdi-navigation-menu i-24"></i></a>

                <div className="navbar-item pull-left h4"><Link to="/">Freeway</Link></div>
                <ul className="nav nav-sm navbar-tool pull-right">
                    <li className="dropdown">
                        <a data-md-ink-ripple data-toggle="dropdown">
                            <i className="mdi-navigation-more-vert i-24"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-scale pull-right pull-up text-color">
                            <li><Link to="/company">Profile Settings</Link></li>
                            <li><Link to="/company">Company Settings</Link></li>
                            {companies.map(function (c) {
                                return <li key={c.id}><Link to={`companies/${c.id}`}>{c.name}</Link></li>
                            })}
                            <li><Link to="/logout">Logout</Link></li>
                            <li className="divider"></li>
                            <li><Link to="/help">Help &amp; feedback</Link></li>
                        </ul>
                    </li>
                </ul>
                <div className="pull-right"></div>
            </div>
        )
    }

    _onChange() {
        this.setState({companies: CompanyStore.companies});
    }
}

export default MenuItem
