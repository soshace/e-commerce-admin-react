import React from 'react';
import classnames from 'classnames';
import CompanyMenu from './CompanyMenu.jsx';
import CompanyActions from './../../actions/CompanyActions.js';
import CompanyStore from './../../stores/CompanyStore.js';


class Company extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: []
        };
    }


    render() {
        return (
            <div className="app-content">
                <div className="p-h-md p-v bg-white box-shadow pos-rlt">
                    <h3 className="no-margin">Company Settings</h3>
                </div>
                <div className="box">
                    <CompanyMenu />

                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Company
