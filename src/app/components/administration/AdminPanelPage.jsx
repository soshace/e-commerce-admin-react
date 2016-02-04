import React from 'react';
import classnames from 'classnames';
import Aside from './Aside.jsx';
import Navbar from './../Navbar.jsx';


class AdminPanelPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Aside/>
                <div id="content" className="app-content" role="main">
                    <div className="box">
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
}

export default AdminPanelPage
