import React from 'react';
import { childrenWithProps } from './../../../utils/utils.js';


class Developers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: this.props.project
        };

        this._goTo = this._goTo.bind(this);
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
                <ul className="nav nav-md nav-tabs nav-lines b-info">
                    <li className="active">
                        <a href data-toggle="tab" data-target="#tab_1" onClick={this._goTo.bind(this, 'types')}>Product Types</a>
                    </li>
                    <li>
                        <a href data-toggle="tab" data-target="#tab_2" onClick={this._goTo.bind(this, 'danger')}>Danger</a>
                    </li>
                </ul>
                <div className="tab-content p m-b-md b-t b-t-2x">
                    <div role="tabpanel" className="tab-pane animated fadeIn active">
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    _goTo(link) {
        var { project } = this.state,
            route = `/${project.slug}/developers/${link}`;
        this.context.router.push(route);
    }
}

Developers.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Developers
