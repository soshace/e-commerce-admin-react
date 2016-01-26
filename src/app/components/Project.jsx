import React from 'react';
import { Link } from 'react-router';

class Project extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Project
