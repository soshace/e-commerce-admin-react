import React from 'react';
import { Link } from 'react-router';
import { childrenWithProps } from './../../../utils/utils.js';
import SettingsInternational from './SettingsInternational.jsx';
import SettingsGeneral from './SettingsGeneral.jsx';


class Settings extends React.Component {
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
        var { project } = this.state;
        return (
            <div className="panel panel-default">
                <div>
                    <ul className="nav nav-md nav-tabs nav-lines b-info">
                        <li className="active">
                            <a href data-toggle="tab" data-target="#tab_1">International</a>
                        </li>
                        <li>
                            <a href data-toggle="tab" data-target="#tab_2">General</a>
                        </li>
                    </ul>
                    <div className="tab-content p m-b-md b-t b-t-2x">
                        <div role="tabpanel" className="tab-pane animated fadeIn active" id="tab_1">
                            <SettingsInternational project={project} />
                        </div>
                        <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_2">
                            <SettingsGeneral project={project} />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Settings
