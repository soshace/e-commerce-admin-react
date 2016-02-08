import React from 'react';
import classnames from 'classnames';
import CompanyMenu from './CompanyMenu.jsx';
import {CompanyActions} from './../../actions';
import {CompanyStore} from './../../stores';
import Navbar from './../Navbar.jsx';


class Company extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: {
                name: ''
            }
        };

        this._onCompaniesGet = this._onCompaniesGet.bind(this);
    }

    componentDidMount() {
        CompanyStore.addChangeListener(this._onCompaniesGet);
        CompanyActions.getCompanies();
    }

    componentWillUnmount() {
        CompanyStore.removeChangeListener(this._onCompaniesGet);
    }

    componentWillReceiveProps(newProps) {
        this._onCompaniesGet(newProps);
    }

    render() {
        var id = this.props.params.id,
            company = this.state.company;
        return (
            <div>
                <Navbar/>

                <div className="app-content">
                    <div className="p-h-md p-v bg-white box-shadow pos-rlt">
                        <h3 className="no-margin">Company Settings: {company.name}</h3>
                    </div>
                    <div className="box">
                        <CompanyMenu id={id}/>

                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

    _onCompaniesGet(newProps) {
        var id,
            company;
        if (newProps) {
            id = newProps.params.id;
        } else {
            id = this.props.params.id;
        }
        company = CompanyStore.getCompanyById(id);
        this.setState({company: company});
    }
}

export default Company
