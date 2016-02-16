import React from 'react';
import { childrenWithProps } from './../../../utils/utils.js';


class Categories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: this.props.project
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({project: newProps.project});
    }

    render() {
        var { project } = this.state,
            children;

        if (project) {
            children = childrenWithProps(this, { project: project });
        }
        return (
            <div className="panel panel-default">
                {children}
            </div>
        )
    }

}

export default Categories
