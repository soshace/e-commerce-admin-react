import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Navbar from './../Navbar.jsx';
import AccountMenu from './AccountMenu.jsx';

class Account extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>

                <div className="app-content">
                    <div className="p-h-md p-v bg-white box-shadow pos-rlt">
                        <h3 className="no-margin">Account</h3>
                    </div>
                    <div className="box">
                        <AccountMenu />
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Account
