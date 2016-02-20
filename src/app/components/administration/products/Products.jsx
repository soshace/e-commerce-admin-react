import React from 'react';
import { childrenWithProps } from './../../../utils/utils.js';
import { ProjectStore } from './../../../stores';


class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: this.props.projects || [],
            companies: this.props.companies || [],
            user: this.props.user,
            project: ProjectStore.getProjectByKey(this.props.params.projectKey)
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            projects: newProps.projects,
            companies: newProps.companies,
            user: newProps.user,
            project: ProjectStore.getProjectByKey(newProps.params.projectKey)
        });
    }

    render() {
        var { companies, projects, project, user } = this.state,
            children;

        if (project) {
            children = childrenWithProps(this,  { companies, projects, project, user });
        }
        return (
            <div className="panel panel-default">
                {children}
            </div>
        )
    }

}

export default Products
