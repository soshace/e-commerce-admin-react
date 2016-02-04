import React from 'react';
import classnames from 'classnames';
import CompanyMenu from './CompanyMenu.jsx';
import CompanyActions from './../../actions/CompanyActions.js';
import CompanyStore from './../../stores/CompanyStore.js';
import Navbar from './../Navbar.jsx';


class Company extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: []
        };
    }


    render() {
        var id = this.props.params.id;
        return (
            <div>
                <Navbar/>

                <div className="app-content">
                    <div className="p-h-md p-v bg-white box-shadow pos-rlt">
                        <h3 className="no-margin">Company Settings</h3>
                    </div>
                    <div className="box">
                        <CompanyMenu id={id}/>

                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Company
