import React from 'react';
import { Link } from 'react-router';

class Project extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/companyname/dashboard">dash</Link></li>
                    <li><Link to="/companyname/products">products</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default Project
